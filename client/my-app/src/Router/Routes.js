import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Components/Login';
import Homepage from '../Components/Homepage';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/homepage" exact component={Homepage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
