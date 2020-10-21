import React from 'react'

import { Input } from 'antd'
import styles from './Editor.module.scss'

export interface EditorProps {
  dataSource: Model.App
}

export default function Editor({ dataSource }: EditorProps) {
  return <div className={styles.container}>
    <FormGroup label="name" required>
      <Input value={dataSource.name} />
    </FormGroup>
  </div>
}

interface FormGroupProps {
  label: string
  required?: boolean
  className?: string
  children?: React.ReactNode
}

function FormGroup({ label, required, className, children }: FormGroupProps) {
  return (
    <div className={`${className && className} ${styles.group}`}>
      <div className={`${styles.label} ${required && styles.required}`}>{label}</div>
      <div className={styles.value}>
        { children }
      </div>
    </div>
  )
}