
import React from 'react'
import styles from './ContentHeader.module.scss'

export interface ContentHeaderProps {
  title: string
  children?: JSX.Element
}

export default function ContentHeader({ title, children }: ContentHeaderProps) {
  return <div className={styles.container}>
    <h2 className={styles.left}>{title}</h2>
    <div className={styles.right}>{children}</div>
  </div>
}