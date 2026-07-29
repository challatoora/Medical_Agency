import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Suppliers from "./pages/Suppliers";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Billing from "./pages/Billing";
import Users from "./pages/Users";

import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "medicines":
        return <Medicines />;

      case "suppliers":
        return <Suppliers />;

      case "inventory":
        return <Inventory />;

      case "orders":
        return <Orders />;

      case "billing":
        return <Billing />;

      case "users":
        return <Users />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main-layout">
        <Sidebar setPage={setPage} />

        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;