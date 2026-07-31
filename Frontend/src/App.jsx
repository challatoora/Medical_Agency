import React, { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Medicines from "./pages/Medicines";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Billing from "./pages/Billing";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Users":
        return <Users />;

      case "Medicines":
        return <Medicines />;

      case "Inventory":
        return <Inventory />;

      case "Suppliers":
        return <Suppliers />;

      case "Orders":
        return <Orders />;

      case "Billing":
        return <Billing />;

      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="main-content">
        <Header />

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
