import React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'

import Login from '../views/Login'

import { history } from './history'

// const ValidateReturn = props => {
//   const isLogged = !!localStorage.getItem('@uuid')
 
//   return !isLogged ? <Route {...props}/> : <Redirect to='/dashboard' />

// }

// const PrivateRoute = props => {
//   const isLogged = !!localStorage.getItem('@uuid')
  
//   return isLogged ? <Route {...props}/> : <Redirect to='/login' />
// }

const Routes = () => {

  return(
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={ Login }/>
        <Redirect from='*' to='/login' />
      </Switch>
    </Router>
  )
}

export default Routes