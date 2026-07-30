import {
  LayoutDashboard,
  Pill,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
  Users,
  Settings,
  LogOut,
  HeartPulse
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  },
  {
    name: "Medicines",
    icon: Pill,
    path: "/medicines"
  },
  {
    name: "Inventory",
    icon: Package,
    path: "/inventory"
  },
  {
    name: "Suppliers",
    icon: Truck,
    path: "/suppliers"
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders"
  },
  {
    name: "Billing",
    icon: CreditCard,
    path: "/billing"
  },
  {
    name: "Users",
    icon: Users,
    path: "/users"
  }
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo-section">
        <div className="logo-icon">
          <HeartPulse size={24} />
        </div>

        <div>
          <h2>MedCare</h2>
          <span>Medical Agency</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              href={item.path}
              className={`menu-item ${
                item.name === "Dashboard" ? "active" : ""
              }`}
              key={item.name}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </a>
          );
        })}

        <p className="menu-title">SYSTEM</p>

        <a href="/settings" className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </a>

        <a href="/logout" className="menu-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;