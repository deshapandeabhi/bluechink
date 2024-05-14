// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home"; // Import your Home component or any other components you want to render

const App = () => {
  return (
    <div>
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
