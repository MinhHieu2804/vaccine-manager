import React, { Component } from 'react'
import './home.css'

export default class Home extends Component {
    render() {
        return (
            <div className="userHome">
                <h1>Wellcome {this.props.user.ten}</h1>
            </div>
        )
    }
}
