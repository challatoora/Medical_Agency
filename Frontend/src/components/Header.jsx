import {
  Search,
  Bell,
  ChevronDown
} from "lucide-react";

function Header() {
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
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
}

export default Header;