import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Billing from "./pages/Billing";
import Users from "./pages/Users";

import "./App.css";

function App() {
return (
<BrowserRouter>
<div className="app-container">
<Sidebar />

    <div className="main-content">
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  </div>
</BrowserRouter>

);
}

export default App;