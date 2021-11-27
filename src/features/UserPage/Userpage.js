import React, { Component, useEffect } from 'react'
import Userheader from './Userheader'
import UserSideBar from './UserSideBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './userPage.css';
import Home from "./Home";
import axios from 'axios'
import ViewVaccination from './ViewVaccination';
import UserInfo from './UserInfo';

export default class Userpage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handlesetState = this.handlesetState.bind(this)
    }

    componentDidMount() {
        const config = {
            jwt: localStorage.getItem('jwt')
        }
        axios.post('http://localhost/vaccine-manager/api/roles/user/validate_token.php', JSON.stringify(config))
            .then(res => {
                this.setState({
                    user: res.data.data
                });
                console.log(res.data.data);
            },
                err => {
                    console.log(err);
                }
            )
    }

    componentDidUpdate(pevProps, state) {
        const config = {
            jwt: localStorage.getItem('jwt')
        }
        axios.post('http://localhost/vaccine-manager/api/roles/user/validate_token.php', JSON.stringify(config))
            .then(res => {
                console.log({ a: res.data.data, b: this.state.user })
                if (JSON.stringify(res.data.data) !== JSON.stringify(this.state.user)) {
                    this.setState({
                        user: res.data.data
                    });
                }

            },
                err => {
                    console.log(err);
                }
            )
    }

    handlesetState(data) {
        this.setState({
            user: data
        })
        console.log(data);
    }

    render() {
        if (this.state.user) {
            return (
                <Router>
                    <div className="userPage">
                        <Userheader user={this.state.user} />
                        <div className="userPageMain">
                            <UserSideBar />
                            <Switch>
                                <Route exact path="/userPage" component={() => <Home user={this.state.user} />} />
                                <Route exact path="/userPage/view" component={() => <ViewVaccination user={this.state.user} />} />
                                <Route exact path="/userPage/Info" component={() => <UserInfo user={this.state.user} action={this.handlesetState} />} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            )
        }
        return (
            <h1>NEED TO LOGIN</h1>
        )
    }
}

