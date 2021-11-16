import { useState, useEffect } from 'react'
import * as React from 'react'
import './usersideBar.css';
import { Reorder, People, ExitToApp, LibraryBooks } from '@material-ui/icons';
import { Link } from 'react-router-dom';


export default function UserSideBar() {


    const liCkickFun = (event) => {

    }

    return (
        <div className="userSideBar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">DashBoard</h3>
                    <ul className="sideBarList">
                        <Link to='/userPage/home' className="dirLink"><li id="1" className="sideBarListItem " onClick={(e) => liCkickFun(e)}><Reorder />Home</li></Link>
                        <Link to='/userPage/Info' className="dirLink"><li id='2' className="sideBarListItem " onClick={(e) => liCkickFun(e)}><LibraryBooks />UserInfo</li></Link>
                        <Link to='/userPage/Info' className="dirLink"><li id='2' className="sideBarListItem " onClick={(e) => liCkickFun(e)}><People />Vaccination Lookup</li></Link>
                    </ul>
                    <h3 className="sideBarTitle">Account</h3>
                    <ul className="sideBarList">
                        <li className="sideBarListItem"><ExitToApp />Sign out</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

