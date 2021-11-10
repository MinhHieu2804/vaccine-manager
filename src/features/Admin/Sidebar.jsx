import { React, useState, useEffect } from 'react'
import './sidebar.css';
import { Reorder, People, ExitToApp, PersonAdd } from '@material-ui/icons';
import { Link } from 'react-router-dom';


export default function Sidebar() {
    const [active, setactive] = useState(localStorage.getItem('store'));

    useEffect(() => {
        let b = document.getElementsByClassName('active');
        for (let i = 0; i < b.length; i++) {
            b[i].classList.remove('active');
        }
        if (active >= 1)
            document.getElementById(active).classList.add('active');
    }, [active])

    const liCkickFun = (event) => {
        setactive(event.target.id);
        localStorage.setItem('store', event.target.id);
    }

    return (
        <div className="sidebar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">DashBoard</h3>
                    <ul className="sideBarList">
                        <Link to="/" className="dirLink"><li id="1" className="sideBarListItem " onClick={(e) => liCkickFun(e)}><Reorder />Home</li></Link>
                        <Link to='/userList' className="dirLink"><li id='2' className="sideBarListItem " onClick={(e) => liCkickFun(e)}><People />Users</li></Link>
                        <Link to='/addUser' className="dirLink"><li id='3' className="sideBarListItem " onClick={(e) => liCkickFun(e)}><PersonAdd />Add User</li></Link>
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
