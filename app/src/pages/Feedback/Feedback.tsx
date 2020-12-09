import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'

import { useMount, useUpdateEffect } from 'react-use'
import { useFeedback, useApp } from 'reducer'

import { Table, Image, Form } from 'antd'
import { ContentHeader } from 'components'
import styles from './Feedback.module.scss'

type FeedbackItem = Model.Feedback & { app: Model.App}

const columns = [
  {
    title: 'App Name',
    dataIndex: ['app', 'name'],
    key: 'appName',
  },
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },{
    title: 'Images',
    dataIndex: 'images',
    key: 'images',
    render: (_: string, record: Model.Feedback) => {
      // TODO: Remove any
      const ImageGroup: any = Image.PreviewGroup
      return <div className={styles.images}>
        <ImageGroup>
          {
            record.images.map(src => <Image key={src} src={src} />)
          }
        </ImageGroup>
      </div>
    }
  },{
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
]

export default function Feedback(props: RouteComponentProps) {
  const [app, loadApp] = useApp()
  const [feedback, loadFeedback] = useFeedback()

  useMount(() => {
    if (feedback.status === 'none' || feedback.status === 'error') loadFeedback()
    if (app.status === 'none' || app.status === 'error') loadApp()
  })

  const getDataSource = () => {
    const list: FeedbackItem[] = []
    if (app.status === 'finished' && feedback.status === 'finished') {
      
      const apps: Record<string, Model.App> = {}

      for (const a of app.data!.apps) {
        apps[a.appId!] = a
      }

      for (const f of feedback.data!) {
        list.push({...f, app: apps[f.appId]})
      }
    }
    return list
  }

  const [dataSource, setDataSource] = useState<FeedbackItem[]>(getDataSource())
  useUpdateEffect(() => {
    const list = getDataSource()
    if (list.length) setDataSource(list)
  }, [app.status, feedback.status])

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Feedbacks" />
    <Table
      loading={app.status === 'loading' || feedback.status === 'loading'}
      rowKey="_id"
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: record => <Form className={styles.detail} labelCol={{ span: 2 }}>
          <Form.Item label="Path">{record.path}</Form.Item>
          <Form.Item label="Message">{record.message}</Form.Item>
          <Form.Item label="User">{record.user}</Form.Item>
          <Form.Item label="User Agent">{record.userAgent}</Form.Item>
          <Form.Item label="Data">{record.data && JSON.stringify(record.data)}</Form.Item>
        </Form>
      }}
    />
  </div>
}