import React from 'react'
import { RouteComponentProps } from '@reach/router'

import styles from './Feedback.module.scss'

export default function Feedback(props: RouteComponentProps) {
  return <div className={`content-container ${styles.container}`}>Feedback</div>
}