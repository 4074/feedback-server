import React from 'react'
import ReactDOM from 'react-dom'
import ReduxProvider from './ReduxProvider'
import App from './App'

const $root = document.getElementById('root')

function render(Component: () => JSX.Element) {
  ReactDOM.render(
    <ReduxProvider >
      <Component />
    </ReduxProvider>,
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
