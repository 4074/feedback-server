import React from 'react'

import { Menu } from 'antd'
import logo from 'static/logo.svg'
import styles from './Header.module.scss'

export default function Header() {
  return <header className={styles.container}>
    <div className={`content-container ${styles.inner}`}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"/>
      </div>
      <Menu className={styles.menu} mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">App</Menu.Item>
        <Menu.Item key="2">Feedback</Menu.Item>
      </Menu>
    </div>
  </header>
}