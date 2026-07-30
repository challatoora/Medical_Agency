import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Pill,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: Pill,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Package,
    },
    {
      name: "Suppliers",
      path: "/suppliers",
      icon: Truck,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: CreditCard,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CMR Medical</h2>
        <p>Agency Management</p>
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

