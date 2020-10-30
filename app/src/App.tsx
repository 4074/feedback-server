import React from 'react'
import { LocationProvider, Router } from '@reach/router'

import 'antd/dist/antd.less'
import './styles/main.scss'

import { Header, Home, Feedback } from './pages'

function App() {
  return (
    <LocationProvider>
      <div className="app">
        <Header />
        <Router>
          <Home path='/' />
          <Feedback path='feedback' />
        </Router>
      </div>
    </LocationProvider>
  )
}

export default App
