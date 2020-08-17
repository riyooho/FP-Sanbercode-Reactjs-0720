import React from "react";
import "./App.css";
import { UserProvider } from "./users/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./template/Dashboard";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Router>
            <Switch>
              <Route path="/" component={Dashboard} />
            </Switch>
          </Router>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
