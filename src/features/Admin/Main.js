import React, { Fragment } from 'react';
import Header from './header';
import './Main.css';
import UserList from './page/UserList';
import Sidebar from './Sidebar';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import Home from './page/Home';

function Main() {
    return (
        <Router>
            <div className="mymain">
                <Header />
                <hr />
                <div className="mycontainer">
                    <Sidebar />
                    <Switch>
                        <Route exact path="/userList">
                            <UserList />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="*">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Main;