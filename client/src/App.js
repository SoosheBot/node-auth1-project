import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import Register from './components/Register';
import Login from "./components/Login";
import UserList from "./components/UserList";


import './App.css';

function App() {
  return (
    <div className="App">
      <h1> USER LIST </h1>
      <Router>
        <Switch>
          <PrivateRoute path="/userlist" component={UserList} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
