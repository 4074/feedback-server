import React from 'react'
import { Router } from '@reach/router'

import 'antd/dist/antd.less'
import './styles/main.scss'

import { Header, Home, Fx } from './pages'

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
