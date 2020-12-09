import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { useMount } from 'react-use'
import { useFeedback } from 'reducer'

import { Table, Image } from 'antd'
import { ContentHeader } from 'components'
import styles from './Feedback.module.scss'

export default function Feedback(props: RouteComponentProps) {
  const [feedback, loadFeedback] = useFeedback()

  useMount(() => {
    if (feedback.status === 'none' || feedback.status === 'error') loadFeedback()
  })

  const columns = [
    {
      title: 'AppID',
      dataIndex: 'appId',
      key: 'appId',
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

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Feedbacks" />
    <Table className={styles.table} dataSource={feedback.data} columns={columns} />
  </div>
}