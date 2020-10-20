import { createSlice, combineReducers, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { Reducer, CombinedState, Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

export interface GenericState<T> {
  data?: T
  error?: Error,
  status: 'none' | 'loading' | 'finished' | 'error'
}

interface EffectHandleFunction {
  (dispatch: Dispatch): any
}
export interface EffectHandles {
  success: EffectHandleFunction[]
}

const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
    name = '',
    initialState,
    reducers
  }: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = 'loading'
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.status = 'finished'
      },

      fail(state: GenericState<T>, action: PayloadAction<Error>) {
        state.error = action.payload
        state.status = 'finished'
      },

      reducer(state: GenericState<T>, action: PayloadAction<(state: GenericState<T>) => void>) {
        action.payload(state)
      },

      ...reducers
    }
  })
}

export default function createGenericRepo<
  E extends (...args: any) => Promise<any>,
  T = E extends (...args: any) => Promise<infer R> ? R : never,
  H = E extends (...args: infer R) => Promise<T> ? (...args: R) => Promise<void> : never
>(
    name: string,
    effect: E,
    reducers: ValidateSliceCaseReducers<GenericState<T>, SliceCaseReducers<GenericState<T>>> = {}
  ) {

  const initialState = { status: 'none' } as GenericState<T>

  const slice = createGenericSlice({
    name,
    initialState,
    reducers
  })

  const handles: EffectHandles = {
    success: []
  }

  function hook(): [GenericState<T>, H] {
    const data = useSelector<any, GenericState<T>>(state => state[name])
    const dispacth = useDispatch()
    const actions = slice.actions

    const load = (async (...params: any[]) => {
      dispacth(actions.start())
      try {
        const result = await effect(...params)
        for (const handle of handles.success) {
          handle(dispacth)
        }
        dispacth(actions.success(result))
      } catch (error) {
        dispacth(actions.fail(error))
      }
    }) as any
  
    return [data, load]
  }

  return {
    slice,
    reducer: {
      [name]: slice.reducer
    },
    hook,
    handles
  }
}

type EffectHook<
  E extends (...args: any) => Promise<any>,
  T = E extends (...args: any) => Promise<infer R> ? R : never,
  H = E extends (...args: infer R) => Promise<T> ? (...args: R) => Promise<void> : never
> = () => [GenericState<T>, H]

export function createRepos<
  L extends {[key: string]: E},
  E extends (...args: any) => Promise<any>
>(list: L): { reducer: Reducer<CombinedState<{ [x: string]: any; }>, never>, hooks: {[k in keyof L]: EffectHook<L[k]>} } {

  const reducers: any = {}
  const hooks: any = {}

  for (const [name, effect] of Object.entries(list)) {
    const repo = createGenericRepo(name, effect)
    reducers[name] = repo.reducer
    hooks[name] = repo.reducer
  }

  return {
    reducer: combineReducers(reducers),
    hooks
  }
}