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
            <Route exact path="/admin/userList">
              <UserList />
            </Route>
            <Route exact path="/admin/addUser">
              <Adduser />
            </Route>
            <Route exact path="/admin/editUser/:userId">
              <EditUser />
            </Route>
            <Route exact path="/admin/editVaccination/:vacId">
              <EditVaccination />
            </Route>
            <Route exact path="/admin/vaccinations">
              <Vaccinations />
            </Route>
            <Route exact path="/admin/addVaccination">
              <AddVaccination />
            </Route>
            <Route exact path="/admin">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Main;
