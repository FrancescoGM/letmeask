import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'

import './services/firebase'

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)
