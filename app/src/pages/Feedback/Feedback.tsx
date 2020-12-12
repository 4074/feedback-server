import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import dayjs from 'dayjs'

import { useMount, useUpdateEffect } from 'react-use'
import { useFeedback, useApp } from 'reducer'

import { Table, Image, Form, Input } from 'antd'
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
    render: (text: string) => <div className={styles.path}>{text}</div>
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
    render: (text: string) => <div className={styles.message}>{text}</div>
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
    render: (text: string) => <div>{dayjs(text).format('YYYY/MM/DD HH:mm')}</div>
  },
]

const filterFeedback = (source: FeedbackItem[], keyword: string): FeedbackItem[] => {
  const pieces = keyword.trim().split(/\s+/)
  const sorts: string[] = []
  const detects: string[] = []
  const includes: string[] = []

  for (const piece of pieces) {
    if (/^is:/.test(piece)) {
      detects.push(piece.replace(/^is:/, ''))
    } else if (/^sort:/.test(piece)) {
      sorts.push(piece.replace(/^sort:/, ''))
    } else {
      includes.push(piece)
    }
  }
  
  const filtered = source.filter((item) => {
    for (const detect of detects) {
      if (detect === 'open' && item.closed) return false
      if (detect === 'closed' && !item.closed) return false
    }
    for (const include of includes) {
      if (
        !item.message.toLowerCase().includes(include.toLowerCase()) &&
        !item.path.toLowerCase().includes(include.toLowerCase()) &&
        (!item.app || !item.app.name.toLowerCase().includes(include.toLowerCase()))
      ) return false
    }
    return true
  })

  const fieldTranforms: Record<string, string> = {
    date: 'timestamp'
  }

  if (sorts.length) {
    filtered.sort((a: any, b: any): number => {
      for (const sortItem of sorts) {
        let [field, type = ''] = sortItem.split('-')
        field = field.toLowerCase()
        field = fieldTranforms[field] || field
        type = type.toLowerCase()
        if (!['desc', 'asc'].includes(type)) type = 'desc'
        if (a[field] === b[field]) continue

        if (type === 'desc') {
          return a[field] > b[field] ? -1 : 1
        } else {
          return a[field] < b[field] ? -1 : 1 
        }
      }

      return 0
    })
  }

  return filtered
}

export default function Feedback(props: RouteComponentProps) {
  const [app, loadApp] = useApp()
  const [feedback, loadFeedback] = useFeedback()
  const [keyword, setKeyword] = useState('is:open sort:date-desc ')

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
    return filterFeedback(list, keyword)
  }

  const [dataSource, setDataSource] = useState<FeedbackItem[]>(getDataSource)
  useUpdateEffect(() => {
    const list = getDataSource()
    if (list.length) setDataSource(list)
  }, [app.status, feedback.status])

  const handleSearch = () => {
    setDataSource(getDataSource())
  }

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Feedbacks" />
    <Input.Search placeholder="Input..." value={keyword} onChange={(event) => {setKeyword(event.target.value)}} onSearch={handleSearch} />
    <Table
      loading={app.status === 'loading' || feedback.status === 'loading'}
      rowKey="_id"
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      pagination={{hideOnSinglePage: true}}
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