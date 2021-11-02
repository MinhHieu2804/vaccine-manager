import './App.css';
import Login from './features/Login/Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import SignUp from './features/SignUp/SignUp';

function App() {
  return (
    <Fragment>
      <SignUp />
    </Fragment>
  );
}

export default App;
