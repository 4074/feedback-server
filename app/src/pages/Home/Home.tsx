import React from 'react'
import { useMount, useUpdateEffect } from 'react-use'
import { useApp } from 'hooks'
import { RouteComponentProps } from '@reach/router'

import { message } from 'antd'

export default function Home(props: RouteComponentProps) {
  const [app, load] = useApp()

  useMount(() => !app.loaded && !app.loading && load())
  useUpdateEffect(() => {
    if (app.error) message.error(app.error.message || '请求失败，请稍后重试')
  }, [app.error])

  return <div className="page page-home">Home</div>
}