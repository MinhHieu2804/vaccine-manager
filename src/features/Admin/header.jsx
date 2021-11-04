import React from 'react'
import './header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="topLeft">
                    <span className="logo">Vaccine Manager</span>
                </div>
                <div className="topRight">
                    Admin
                </div>
            </div>
        </div>
    )
}
