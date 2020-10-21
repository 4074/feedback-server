import React from 'react'
import { useMount, useUpdateEffect } from 'react-use'
import { useApp } from 'reducer'
import { RouteComponentProps } from '@reach/router'
import { ContentHeader } from 'components'

import { Button, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './Home.module.scss'

export default function Home(props: RouteComponentProps) {
  const [app, load] = useApp()
  Modal.useModal()
  useMount(() => app.status !== 'loading' && app.status !== 'finished' && load())
  useUpdateEffect(() => {
    if (app.error) message.error(app.error.message || '请求失败，请稍后重试')
  }, [app.error])

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Apps">
      <Button className={styles.createButton} type="primary" icon={<PlusOutlined />} >Create</Button>
    </ContentHeader>
    {
      app.data?.apps &&
      <div>
        {
          app.data.apps.map(item => <Item key={item.appId} dataSource={item} />)
        }
      </div>
    }
  </div>
}


interface ItemProps {
  dataSource: Model.App
}
function Item({ dataSource }: ItemProps) {
  return <div>
    <div>{dataSource.name}</div>
  </div>
}