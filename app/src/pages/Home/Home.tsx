import React, { useState } from 'react'
import { useMount, useUpdateEffect } from 'react-use'
import { useApp, useAppSave } from 'reducer'
import { RouteComponentProps } from '@reach/router'

import { Button, message, Modal } from 'antd'
import { ContentHeader } from 'components'
import Editor from './Editor'

import { PlusOutlined } from '@ant-design/icons'
import styles from './Home.module.scss'

export default function Home(props: RouteComponentProps) {
  const [app, load] = useApp()
  const [saveData, save] = useAppSave()

  useMount(() => app.status !== 'loading' && app.status !== 'finished' && load())
  useUpdateEffect(() => {
    if (app.error) message.error(app.error.message || '请求失败，请稍后重试')
  }, [app.error])

  const [modalVisible, setModalVisible] = useState(false)
  const [appEditing, setAppEditing] = useState<Model.App>({name: '', actions: [], hosts: []})

  const handleSave = () => {
    save(appEditing)
  }

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Apps">
      <Button
        className={styles.createButton}
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalVisible(true)}
      >Create</Button>
    </ContentHeader>
    {
      app.data?.apps &&
      <div>
        {
          app.data.apps.map(item => <Item key={item.appId} dataSource={item} />)
        }
      </div>
    }
    <Modal
      title="Edit"
      visible={modalVisible}
      width={600}
      okText="Save"
      onCancel={() => setModalVisible(false)}
      onOk={handleSave}
      okButtonProps={{loading: saveData && saveData.status === 'loading'}}
      maskClosable={false}
    >
      <Editor dataSource={appEditing} onChange={setAppEditing} />
    </Modal>
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

