import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AddBooks from "./Components/AddBooks";
import Breadcrumbs from "./Components/Breadcrumbs";
import NotFoundPage from "./Components/404";
import Collection from "./Components/Collection";
import Monitoring from "./Components/Monitoring";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
require("dotenv").config();

function App() {
  const [bcTitle, setBcTitle] = useState("");
  const [navActive, setNavActive] = useState("home");

  return (
    <div className="App">
      <Navbar active={navActive} />
      <Breadcrumbs title={bcTitle} />
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                setBcTitle("Home");
                setNavActive("home");
                return <Home />;
              }}
            />
            <Route
              exact
              path="/Home"
              render={() => {
                setBcTitle("Home");
                setNavActive("home");
                return <Home />;
              }}
            />
            <Route
              exact
              path="/AddBooks"
              render={() => {
                setBcTitle("Add Books to Collection");
                setNavActive("addbooks");
                return <AddBooks />;
              }}
            />
            <Route
              exact
              path="/Collection"
              render={() => {
                setBcTitle("Collection");
                setNavActive("collection");
                return <Collection />;
              }}
            />
            <Route
              exact
              path="/Monitoring"
              render={() => {
                setBcTitle("Monitoring");
                setNavActive("monitoring");
                return <Monitoring />;
              }}
            />
            <Route
              exact
              path="/404"
              render={() => {
                setBcTitle("NotFoundPage");
                return <NotFoundPage />;
              }}
            />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
