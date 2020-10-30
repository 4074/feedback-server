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
  </div>
}