import React from 'react'
import './sidebar.css';
import { Reorder, People, ExitToApp, PersonAdd } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">DashBoard</h3>
                    <ul className="sideBarList">
                        <li className="sideBarListItem active"><Reorder />Home</li>
                        <li className="sideBarListItem "><People /><Link to='/userList' className="dirLink">Users</Link></li>
                        <li className="sideBarListItem "><PersonAdd />Add User</li>
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
