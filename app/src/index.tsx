import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const $root = document.getElementById('root')

function render(Component: () => JSX.Element) {
  ReactDOM.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
    $root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}
