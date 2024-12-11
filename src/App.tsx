import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import UserDetails from "./components/UserDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
