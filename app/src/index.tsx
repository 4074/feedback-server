import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const $root = document.getElementById('root')

function render(Component: () => JSX.Element) {
  ReactDOM.render(
    <Component />,
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
