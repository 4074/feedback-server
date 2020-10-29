import React, { useState } from 'react'
import { useMount, useUpdateEffect, useUpdate } from 'react-use'
import { useApp, useAppSave } from 'reducer'
import { RouteComponentProps } from '@reach/router'

import { Button, message, Modal, Table, Space } from 'antd'
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

  useUpdateEffect(() => {
    if (saveData.status === "finished") setModalVisible(false)
  }, [saveData.status])

  const handleCreate = () => {
    setAppEditing({name: '', actions: [], hosts: []})
    setModalVisible(true)
  }

  const handleSave = () => {
    save(appEditing)
  }

  const handleEdit = (app: Model.App) => {
    setAppEditing(app)
    setModalVisible(true)
  }

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Apps">
      <Button
        className={styles.createButton}
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
      >Create</Button>
    </ContentHeader>
    {
      app.data?.apps && <List dataSource={app.data?.apps} onEdit={handleEdit} />
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

interface ListProps {
  dataSource: Model.App[]
  onEdit?: (app: Model.App) => void
  onDelete?: (app: Model.App) => void
}

function List({ dataSource, onEdit, onDelete }: ListProps) {

  const columns = [
    {
      title: 'App Id',
      dataIndex: 'appId',
      key: 'appId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hosts',
      dataIndex: 'hosts',
      key: 'hosts',
      render: (hosts: string[]) => hosts.join(', ')
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions?: Model.AppAction[]) => actions && actions.map(a => a.type).join(', ')
    },
    {
      title: '',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="small">
          <Button type="default" size="small" onClick={() => {
            onEdit && onEdit(record)
          }} >Edit</Button>
          <Button type="default" size="small" danger onClick={() => {
            onDelete && onDelete(record)
          }} >Delete</Button>
        </Space>
      )
    },
  ]

  return <div>
    <Table dataSource={dataSource} columns={columns} pagination={{hideOnSinglePage: true}} />
  </div>
}

