import React from 'react'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import {Cart, Home, Login, Register,  Product } from '../containers'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login"/>
        <Route component={Register} path="/register"/>
        <PrivateRoute exact component={Home} path="/"/>
        <PrivateRoute component={Product} path="/produtos"/>
        <PrivateRoute component={Cart} path="/carrinho"/>

      </Switch>
    </Router>
  )
}

export default Routes
