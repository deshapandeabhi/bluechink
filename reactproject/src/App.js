// App.js

import React from 'react';
import NewLogin from './screens/Newlogin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/entrypage";
//import AdminLogin from './components/Login';
import Showcase from './components/Showcase';
import AdminLogin  from './screens/Newlogin';
import AIDashBoard from './screens/AIDashboard';
import AdminDashBoard from './screens/AdminDashboard';
import HomeList from './screens/HomeList';
import RegisterDashboard from './screens/RegisterDashboard';
import RegistrationOfEmployee from './screens/RegisterEmployee';
import RegistrationOfVisitor from './screens/RegisterVisitor';
import RegistrationOfWorker from './screens/RegistrationOfWorker';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header will be visible on all routes */}
        {/* <Header /> */}
        
        {/* Define routes */}
        <Switch>
          {/* Route for Login */}
          <Route exact path="/" component={AdminLogin} /> {/* Set exact path for login */}

          {/* AiDashBoard */}
          <Route path="/aidashboard" component={AIDashBoard} />
          {/* Admin Dash board */}
          <Route path="/admindashboard" component={AdminDashBoard} />
          {/* Route for MainScreen */}
          <Route path="/main" component={Home} />
          <Route path="/showcase" component={Showcase} />
          <Route path="/homelist" component={HomeList} />
          <Route path="/registerdashboard" component={RegisterDashboard} />
          <Route path="/registeremployee" component={RegistrationOfEmployee} />
          <Route path="/registervisitor" component={RegistrationOfVisitor} />
          <Route path="/registerworker" component={RegistrationOfWorker} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
