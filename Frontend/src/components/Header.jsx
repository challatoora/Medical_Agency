import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="header">

      {/* Search */}

      <div className="search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search medicines, orders, suppliers..."
        />

      </div>

      {/* Right Side */}

      <div className="header-right">

        <button className="notification">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div className="header-divider"></div>

        <div className="profile">

          <div className="profile-avatar">
            MR
          </div>

          <div className="profile-info">

            <strong>Murali Reddy</strong>

            <span>Administrator</span>

          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
}

export default Header;