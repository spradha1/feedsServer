import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Redirect to login page when not logged in
export default function PrivateRoute({ component: Component, ...rest}) {

  const { currentUser } = useAuth();
  return (
    <div>
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
      >

      </Route>
    </div>
  )
}
