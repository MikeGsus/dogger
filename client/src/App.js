import React from 'react';
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { Navbar } from './components'
import {
  Home,
  LogIn,
  LogUp
} from './containers';
import Dashboard from './containers/dashboard';
import './App.css'

function App() {
  const account = useSelector(state => state.account)
  return (
    <Router>
      <div className='principal-container'>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {
              account.isLogged
                ?
                  (
                    <Redirect
                      to={{
                        pathname:'/dashboard'
                      }}
                    />
                  )
                : (
                  <Home />
                )
            }
          </Route>
          <Route path="/log-in">
            {
              account.isLogged
                ?
                  (
                    <Redirect
                      to={{
                        pathname:'/dashboard'
                      }}
                    />
                  )
                : (
                  <LogIn />
                )
            }
          </Route>
          <Route path="/log-up">
            {
              account.isLogged
                ?
                  (
                    <Redirect
                      to={{
                        pathname:'/dashboard'
                      }}
                    />
                  )
                : (
                  <LogUp />
                )
            }
          </Route>
          <Route path="/dashboard">
            {
              account.isLogged
                ?
                  (
                    <Dashboard />
                  )
                : (
                  <Redirect
                    to={{
                      pathname:'/log-in'
                    }}
                  />
                )
            }
          </Route>
          <Route path="*">
            <Redirect
              to={{
                pathname: account.isLogged ? '/dashboard' : '/'
              }}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
