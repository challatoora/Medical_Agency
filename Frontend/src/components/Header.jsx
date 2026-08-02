import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Header({ user }) {

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
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>


          <div className="profile-info">

            <strong>
              {user?.name || user?.username || "User"}
            </strong>

            <span>
              {user?.role || "User"}
            </span>

          </div>


          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
}

export default Header;