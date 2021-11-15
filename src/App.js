import Login from './features/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Fragment } from 'react';
import SignUp from './features/SignUp/SignUp';
import Main from './features/Admin/Main';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Userpage from './features/UserPage/Userpage';


function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/userPage">
            <Userpage />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            Not found
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
