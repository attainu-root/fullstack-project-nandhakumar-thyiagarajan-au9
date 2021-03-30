import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import Homepage from "../Components/Homepage";
import ProtectedRoute from "../Components/ProtectedRoute";
import Forgotpassword from "../Components/Forgotpassword";

const Router = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route exact path="/homepage">
            <ProtectedRoute component={Homepage} />
          </Route>
          <Route path="/forgotpassword" exact component={Forgotpassword} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
