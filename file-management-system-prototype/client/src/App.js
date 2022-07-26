import React, { Component } from "react";
import Upload from "./upload";
import Login from "./login";
import Access from "./Access";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";
import User from "./user";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/access" element={<Access />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
