import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import LoginProvider from './login/loginprovider.js'
import Routes from './component/routes.js';
import Nav from './component/nav.js';
// import Contact from './component/contact.js';
// import Index from './component/index.js';

function App() {
  return (
    <LoginProvider>
      <div>
        <Router>
          <Nav/>
          <section>
            <Routes/>
          </section>
        </Router>
      </div>
      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </LoginProvider>

    // <Index/>
    // <Contact/>

  );
}

export default App;