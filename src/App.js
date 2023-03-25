import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Queueing from "./Pages/Queueing/Queueing";
import AppProvider from "./context/AppContext";
import Simulation from "./Pages/Simulation/Simulation";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queueing" element={<Queueing />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
