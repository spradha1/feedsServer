import React from "react";
import Signup from "./Signup";
import Dash from "./Dash";
import Login from "./Login";
import Following from "./Following";
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import styles from '../styles/App.module.css';


function App() {
  return (  
    <div className={styles.MainContainer}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Dash} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/following' component={Following} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
