import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { useMount } from 'react-use'
import { useFeedback } from 'reducer'

import { ContentHeader } from 'components'
import styles from './Feedback.module.scss'

export default function Feedback(props: RouteComponentProps) {
  const [feedback, loadFeedback] = useFeedback()

  useMount(() => {
    if (feedback.status === 'none' || feedback.status === 'error') loadFeedback()
  })

  return <div className={`content-container ${styles.container}`}>
    <ContentHeader title="Feedbacks" />
    <div className={`${styles.item} ${styles.thead}`}>
      <div className={styles.appId}>AppID</div>
      <div className={styles.path}>Path</div>
      <div className={styles.message}>Message</div>
      <div className={styles.images}>Images</div>
      <div className={styles.date}>Date</div>
    </div>
    {
      feedback.status === 'finished' && feedback.data && feedback.data.map(item =>
        <Item key={item.timestamp} dataSource={item} />
      )
    }
  </div>
}


function Item({ dataSource }: { dataSource: Model.Feedback }) {
  return <div className={styles.item}>
    <div className={styles.appId}>{dataSource.appId}</div>
    <div className={styles.path}>{dataSource.path}</div>
    <div className={styles.message}>{dataSource.message}</div>
    <div className={styles.images}>
      {
        dataSource.images.map(image => 
          <Image key={image} src={image} />
        )
      }
    </div>
    <div className={styles.date}>{dataSource.timestamp}</div>
  </div>
}

function Image({src, alt}: {src: string, alt?: string}) {
  return <img src={src} alt={alt} />
}