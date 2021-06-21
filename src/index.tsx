import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

import './services/firebase'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
