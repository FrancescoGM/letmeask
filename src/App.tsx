import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { Room } from './pages/Room'
import { NewRoom } from './pages/NewRoom'
import { AdminRoom } from './pages/AdminRoom'

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}
