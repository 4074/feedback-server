import React from 'react'

import { Button } from 'antd'
import Header from './Header'

import 'antd/dist/antd.less'
import './styles/main.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Button>Click</Button>
    </div>
  )
}

export default App
