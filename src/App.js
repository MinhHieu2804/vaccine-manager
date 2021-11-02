import './App.css';
import Login from './features/Login/Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import SignUp from './features/SignUp/SignUp';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';


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
          <Route path="*">
            <div>Page not found</div>
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
