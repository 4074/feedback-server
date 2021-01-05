import React, { useState } from 'react'
import { useUpdateEffect } from 'react-use'

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
  useUpdateEffect(() => {
    setActionStr(JSON.stringify(dataSource.actions || [], null, 2))
  }, [dataSource.appId])

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

  const [includeStr, setIncludeStr] = useState(dataSource.setup.include.join('\n'))
  useUpdateEffect(() => {
    setIncludeStr(dataSource.setup.include.join('\n'))
  }, [dataSource.appId])

  const [optionStr, setOptionStr] = useState(JSON.stringify(dataSource.setup.option || {}, null, 2))
  useUpdateEffect(() => {
    setOptionStr(JSON.stringify(dataSource.setup.option || {}, null, 2))
  }, [dataSource.appId])
  const handleOptionBlur = () => {
    try {
      const option = JSON.parse(optionStr)
      onChange && onChange({
        ...dataSource,
        setup: {
          ...dataSource.setup,
          option
        }
      })  
    } catch (error) {
      console.log(error)
      message.error('Option is Not a json!')
    }
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
        autoSize
        value={actionsStr}
        onChange={(event) => setActionStr(event.target.value)}
        onBlur={handleActionsBlur}
      />
    </FormGroup>
    <FormGroup label="Auto Setup">
      <div>
        <Switch checked={dataSource.setup.auto} onChange={(on) => {
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
                value={includeStr}
                onChange={(event) => {
                  setIncludeStr(event.target.value)
                }}
                onBlur={() => {
                  const data = {
                    ...dataSource,
                    setup: {
                      ...dataSource.setup,
                      include: includeStr.split('\n').filter(Boolean)
                    }
                  }
                  console.log(data)
                  onChange && onChange(data)
                }}
              />
            </FormGroup>
            <FormGroup label="Option">
              <Input.TextArea
                placeholder="Input option of feedback.js"
                autoSize
                value={optionStr}
                onChange={(event) => setOptionStr(event.target.value)}
                onBlur={handleOptionBlur}
              />
            </FormGroup>
          </div>
    }
  </div>
}