import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Register from './pages/Register';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
