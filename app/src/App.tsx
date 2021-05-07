import { LocationProvider, Router } from '@reach/router'
import Authority from './Authority'

import 'antd/dist/antd.less'
import './styles/main.scss'

import { Header, Home, Feedback } from './pages'

function App() {
  return (
    <LocationProvider>
      <Authority>
        <div className="app">
          <Header />
          <Router>
            <Home path='/' />
            <Feedback path='feedback' />
          </Router>
        </div>
      </Authority>
    </LocationProvider>
  )
}

export default App
