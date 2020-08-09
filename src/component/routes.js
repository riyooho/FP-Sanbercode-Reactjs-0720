import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Home from './home.js';
import About from './about.js';
import Movies from './movies.js';
import Login from '../login/loginform.js';

const Routes = () => {
    return (
        <div>
        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/movies">
            <Movies/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
  );
}

export default Routes;
