import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserList } from "./components/user/user-list";
import { EditUser } from "./components/user/edit-user";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link
                className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/user-list"} className="nav-link">
                  User List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>
      <div className="wrapper">
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route path="/edit-user/:id" component={EditUser} />
          <Route path="/user-list" component={UserList} />
        </Switch>
      </div>
    </div>
  </Router>);
}

export default App;