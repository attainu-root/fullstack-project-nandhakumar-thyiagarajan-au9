import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Components/Login';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
