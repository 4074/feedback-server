import React from 'react'
import { useLocation, useNavigate } from '@reach/router'

import { Menu } from 'antd'
import logo from 'static/logo.svg'
import styles from './Header.module.scss'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  
  return <header className={styles.container}>
    <div className={`content-container ${styles.inner}`}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"/>
      </div>
      <Menu className={styles.menu} mode="horizontal" defaultSelectedKeys={[location.pathname]} onClick={(event) => {
        navigate(event.key as string)
      }}>
        <Menu.Item key="/">App</Menu.Item>
        <Menu.Item key="/feedback">Feedback</Menu.Item>
      </Menu>
    </div>
  </header>
}