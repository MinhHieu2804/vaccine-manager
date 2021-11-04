import Login from './features/Login/Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import SignUp from './features/SignUp/SignUp';
import Main from './features/Admin/Main';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <Main />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
