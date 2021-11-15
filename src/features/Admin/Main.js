import Header from "./header";
import "./Main.css";
import UserList from "./page/UserList";
import Sidebar from "./Sidebar";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import EditUser from "./page/EditUser";
import Adduser from "./page/Adduser";
import Vaccinations from "./page/Vaccinations";
import EditVaccination from "./page/EditVaccination";
import AddVaccination from "./page/AddVaccination";

function Main() {
  return (
    <Router>
      <div className="mymain">
        <Header />
        <hr />
        <div className="mycontainer">
          <Sidebar />
          <Switch>
            <Route exact path="/userList">
              <UserList />
            </Route>
            <Route exact path="/addUser">
              <Adduser />
            </Route>
            <Route exact path="/editUser/:userId">
              <EditUser />
            </Route>
            <Route exact path="/editVaccination/:id">
              <EditVaccination />
            </Route>
            <Route exact path="/vaccinations">
              <Vaccinations />
            </Route>
            <Route exact path="/addVaccination">
              <AddVaccination />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              404 Not found
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Main;
