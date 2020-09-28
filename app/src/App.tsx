import React from 'react'
import { Router } from '@reach/router'

import { Header, Home, Fx } from './pages'

import 'antd/dist/antd.less'
import './styles/main.scss'

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Home path='/' />
        <Fx path='fx' />
      </Router>
    </div>
  )
}

export default App
