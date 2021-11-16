import React from 'react'
import Userheader from './Userheader'
import UserSideBar from './UserSideBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './userPage.css';
import Home from "./Home";

function Userpage() {
    return (
        <Router>
            <div className="userPage">
                <Userheader />
                <div className="userPageMain">
                    <UserSideBar />
                    <Switch>
                        <Route exact path="/userPage/home">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Userpage;
