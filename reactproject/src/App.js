// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/entrypage";
import AdminLogin from './components/Login';
import Showcase from './components/Showcase';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header will be visible on all routes */}
        <Header />
        
        {/* Define routes */}
        <Switch>
          {/* Route for Login */}
          <Route exact path="/" component={AdminLogin} /> {/* Set exact path for login */}
          
          {/* Route for MainScreen */}
          <Route path="/main" component={Home} />
          <Route path="/showcase" component={Showcase} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
