import React, { Component } from 'react'

export default class Userheader extends Component {
    render() {
        return (
            <div className="header" >
                <div className="headerWrapper">
                    <div className="topLeft">
                        <span className="logo">Vaccine Manager</span>
                    </div>
                    <div className="topRight">
                        Xin chào, {this.props.user.ho_dem} {this.props.user.ten}
                    </div>
                </div>
            </div >
        )
    }
}
