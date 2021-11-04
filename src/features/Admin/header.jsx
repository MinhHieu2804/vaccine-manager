import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="topLeft">
                    <Link to='/' className="dirLink"><span className="logo">Vaccine Manager</span></Link>
                </div>
                <div className="topRight">
                    Admin
                </div>
            </div>
        </div>
    )
}
