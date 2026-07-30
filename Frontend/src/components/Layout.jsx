import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
return ( <div className="app-layout"> <Sidebar />


  <div className="main-section">
    <Header />

    <main className="page-content">
      {children}
    </main>
  </div>
</div>


);
}

export default Layout;
