import React from 'react'
import Userheader from './Userheader'
import UserSideBar from './UserSideBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function Userpage() {
    return (
        <Router>
            <div className="userPage">
                <Userheader />
                <UserSideBar />
                <Switch>
                </Switch>
            </div>
        </Router>
    )
}

export default Userpage;
