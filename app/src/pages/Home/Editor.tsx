import React, { useState } from 'react'

import { Input, message, Switch } from 'antd'
import styles from './Editor.module.scss'

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

export interface EditorProps {
  dataSource: Model.App
  onChange?: (app: Model.App) => void
}

export default function Editor({ dataSource, onChange }: EditorProps) {
  const [actionsStr, setActionStr] = useState(JSON.stringify(dataSource.actions || [], null, 2))
  const handleActionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setActionStr(value)
  }
  const handleActionsBlur = () => {
    try {
      const actions = JSON.parse(actionsStr)
      onChange && onChange({
        ...dataSource,
        actions: actions
      })  
    } catch (error) {
      console.log(error)
      message.error('Actions is Not a json!')
    }
  }

  const handleSetupModeChange = () => {

  }

  return <div className={styles.container}>
    <FormGroup label="Name" required>
      <Input value={dataSource.name} placeholder="Input please" onChange={(event) => {
        onChange && onChange({
          ...dataSource,
          name: event.target.value
        })
      }} />
    </FormGroup>
    <FormGroup label="Hosts" required>
      <Input.TextArea
        placeholder="Input please, e.g: www.163.com"
        value={dataSource.hosts.join('\n')}
        onChange={(event) => {
          onChange && onChange({
            ...dataSource,
            hosts: event.target.value.split('\n')
          })
        }}
      />
    </FormGroup>
    <FormGroup label="Actions">
      <Input.TextArea
        placeholder="Input a actions json please"
        rows={4}
        value={actionsStr}
        onChange={handleActionsChange}
        onBlur={handleActionsBlur}
      />
    </FormGroup>
    <FormGroup label="Auto Setup">
      <div>
        <Switch checked={dataSource.setup?.auto} onChange={(on) => {
          onChange && onChange({
            ...dataSource,
            setup: {
              ...dataSource.setup,
              auto: on
            }
          })
        }} />
        
      </div>
      
    </FormGroup>
    {
          dataSource.setup.auto && 
          <div>
            <FormGroup label="Include">
              <Input.TextArea
                placeholder="Input include paths"
                rows={4}
              />
            </FormGroup>
            <FormGroup label="Option">
              <Input.TextArea
                placeholder="Input option of feedback.js"
                rows={4}
              />
            </FormGroup>
          </div>
        }
  </div>
}