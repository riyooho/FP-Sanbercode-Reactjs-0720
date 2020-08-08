import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './about.js';
import Movie from './movie.js';
import Login from './login.js';


const Routes = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>
                    <li>
                    <Link to="/movie">Movie List Editor</Link>
                    </li>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/movie">
            <Movie/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <></>
          </Route>
        </Switch>
      </div>
  );
}

export default Routes;
