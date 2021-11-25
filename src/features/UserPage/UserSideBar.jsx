import { useState, useEffect, Component } from 'react'
import * as React from 'react'
import './usersideBar.css';
import { Reorder, People, ExitToApp, LibraryBooks } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';


export default class UserSideBar extends Component {
    state = {};

    handleLogout = () => {
        window.location = 'http://localhost:3000/login';
        localStorage.clear();
    }

    render() {
        return (
            <div className="userSideBar">
                <div className="sideBarWrapper">
                    <div className="sideBarMenu">
                        <h3 className="sideBarTitle">DashBoard</h3>
                        <ul className="sideBarList">
                            <Link to='/userPage' className="dirLink"><li id="1" className="sideBarListItem " ><Reorder />Home</li></Link>
                            <Link to='/userPage/Info' className="dirLink"><li id='2' className="sideBarListItem " ><LibraryBooks />UserInfo</li></Link>
                            <Link to='/userPage/view' className="dirLink"><li id='2' className="sideBarListItem " ><People />Vaccination Lookup</li></Link>
                        </ul>
                        <h3 className="sideBarTitle">Account</h3>
                        <ul className="sideBarList">
                            <Link to='/login' className="dirLink" onClick={this.handleLogout}><li className="sideBarListItem" ><ExitToApp />Sign out</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

