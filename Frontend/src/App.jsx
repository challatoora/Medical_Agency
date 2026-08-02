import React, { useState, useEffect } from "react";
import Cart from "./pages/Cart";
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

  const [user, setUser] = useState(null);



  useEffect(() => {

    const token = localStorage.getItem("token");

    const savedUser = localStorage.getItem("user");


    if (token && savedUser) {

      setUser(JSON.parse(savedUser));

      setIsLoggedIn(true);

    } else {

      localStorage.clear();

      setIsLoggedIn(false);

    }

  }, []);




  const handleLogin = (userData) => {

    setUser(userData);

    setIsLoggedIn(true);

  };




  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    setIsLoggedIn(false);

    setCurrentPage("Dashboard");

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

    case "Cart":
      return <Cart setCurrentPage={setCurrentPage} />;

    case "Billing":
      return <Billing />;

    case "Dashboard":
    default:
      return <Dashboard />;

  }

};


  if (!isLoggedIn) {

    return (

      <Login 
        onLogin={handleLogin}
      />

    );

  }



  return (

    <div className="app-container">


      <Sidebar

        currentPage={currentPage}

        setCurrentPage={setCurrentPage}

        user={user}

        logout={handleLogout}

      />



      <main className="main-content">


        <Header 
          user={user}
        />


        {renderPage()}


      </main>


    </div>

  );

}


export default App;