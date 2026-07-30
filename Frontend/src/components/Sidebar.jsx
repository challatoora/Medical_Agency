import React from "react";
cd ~/Medical_Agency/Frontend && cat > src/components/Sidebar.jsx <<'EOF'
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Pill,
  Package,
  Truck,
  ShoppingCart,
  Receipt,
  X
} from "lucide-react";

function Sidebar({ onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Users",
      path: "/users",
      icon: Users
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: Pill
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Package
    },
    {
      name: "Suppliers",
      path: "/suppliers",
      icon: Truck
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart
    },
    {
      name: "Billing",
      path: "/billing",
      icon: Receipt
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CMR Medical Agency</h2>

        {onClose && (
          <button
            className="sidebar-close"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
EOF