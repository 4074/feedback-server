import { uuid, setDeepValue } from '../src/utils'

test('Generate a uuid', () => {
  const id1 = uuid()
  const id2 = uuid()

  expect(id1.length).toBe(36)
  expect(id1).not.toEqual(id2)
})

test('Set a deep value to an object', () => {
  const obj1 = {
    foo: {
      bar: 1
    }
  }
  setDeepValue(obj1, ['foo', 'bar'], 2)
  expect(obj1.foo.bar).toBe(2)
})
