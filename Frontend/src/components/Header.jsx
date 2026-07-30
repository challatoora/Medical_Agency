import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Header() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const name =
    user.name ||
    user.username ||
    user.fullName ||
    "User";

  const role =
    user.role ||
    user.userRole ||
    "Administrator";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();


  return (
    <header className="header">

      <div className="search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search medicines, orders, suppliers..."
        />

      </div>


      <div className="header-right">

        <button className="notification">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>


        <div className="header-divider"></div>


        <div className="profile">

          <div className="profile-avatar">
            {initials}
          </div>


          <div className="profile-info">

            <strong>{name}</strong>

            <span>{role}</span>

          </div>


          <ChevronDown size={18} />

        </div>


      </div>

    </header>
  );
}

export default Header;