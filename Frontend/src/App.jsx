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
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  MoreHorizontal,
  Activity,
  DollarSign,
  Boxes,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Pill, label: "Medicines" },
    { icon: Package, label: "Inventory" },
    { icon: Truck, label: "Suppliers" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: CreditCard, label: "Billing" },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "₹12,48,500",
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart,
      color: "purple",
    },
    {
      title: "Stock Available",
      value: "8,452",
      change: "-2.4%",
      positive: false,
      icon: Boxes,
      color: "green",
    },
    {
      title: "Active Suppliers",
      value: "128",
      change: "+5.1%",
      positive: true,
      icon: Users,
      color: "orange",
    },
  ];

  const orders = [
    {
      id: "#ORD-1024",
      customer: "Apollo Pharmacy",
      date: "30 Jul 2026",
      amount: "₹24,500",
      status: "Completed",
    },
    {
      id: "#ORD-1023",
      customer: "MedPlus",
      date: "30 Jul 2026",
      amount: "₹18,200",
      status: "Processing",
    },
    {
      id: "#ORD-1022",
      customer: "Care Pharmacy",
      date: "29 Jul 2026",
      amount: "₹32,800",
      status: "Completed",
    },
    {
      id: "#ORD-1021",
      customer: "Sri Sai Medicals",
      date: "29 Jul 2026",
      amount: "₹12,600",
      status: "Pending",
    },
  ];

  const quickActions = [
    {
      icon: Pill,
      title: "Add Medicine",
      description: "Add new medicine",
    },
    {
      icon: Truck,
      title: "Add Supplier",
      description: "Register supplier",
    },
    {
      icon: ShoppingCart,
      title: "Create Order",
      description: "Create new order",
    },
  ];

  return (
    <div className="app-container">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">
            <Pill size={26} />
          </div>

          <div>
            <h2>CMR MEDICAL</h2>
            <span>AGENCY</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="sidebar-section">
          <p className="section-title">MAIN MENU</p>

          <nav>
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  className={`nav-item ${item.active ? "active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>

                  {item.active && (
                    <div className="active-indicator" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">

          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          <div className="sidebar-user">
            <div className="user-avatar">
              MR
            </div>

            <div className="user-details">
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>

            <MoreHorizontal size={18} />
          </div>

        </div>

      </aside>

      {/* Main Area */}
      <main className="main-content">

        {/* Header */}
        <header className="header">

          <div className="mobile-menu">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </div>

          <div className="search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search medicines, orders, suppliers..."
            />

            <span className="search-shortcut">
              ⌘ K
            </span>
          </div>

          <div className="header-right">

            <button className="notification">
              <Bell size={21} />
              <span className="notification-dot" />
            </button>

            <div className="header-divider" />

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

        {/* Dashboard Content */}
        <div className="dashboard">

          {/* Welcome */}
          <section className="welcome-section">

            <div>
              <p className="welcome-label">
                Thursday, July 30, 2026
              </p>

              <h1>
                Good Morning, Murali
                <span> 👋</span>
              </h1>

              <p className="welcome-description">
                Here's what's happening with your medical agency today.
              </p>
            </div>

            <button className="primary-button">
              <Plus size={19} />
              New Order
            </button>

          </section>

          {/* Stats */}
          <section className="stats-grid">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  className={`stat-card ${stat.color}`}
                  key={index}
                >

                  <div className="stat-top">

                    <div className="stat-icon">
                      <Icon size={22} />
                    </div>

                    <button className="more-button">
                      <MoreHorizontal size={20} />
                    </button>

                  </div>

                  <p>{stat.title}</p>

                  <div className="stat-bottom">

                    <h2>{stat.value}</h2>

                    <span
                      className={`stat-change ${
                        stat.positive
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {stat.positive ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}

                      {stat.change}
                    </span>

                  </div>

                </div>
              );
            })}

          </section>

          {/* Main Dashboard Grid */}
          <section className="dashboard-grid">

            {/* Revenue Chart */}
            <div className="card revenue-card">

              <div className="card-header">

                <div>
                  <h3>Revenue Overview</h3>
                  <p>Monthly revenue performance</p>
                </div>

                <select>
                  <option>Last 7 Months</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>

              </div>

              <div className="revenue-summary">

                <h2>₹12,48,500</h2>

                <span className="positive">
                  <TrendingUp size={15} />
                  12.5% vs last month
                </span>

              </div>

              <div className="chart">

                <div className="chart-y-axis">
                  <span>₹4L</span>
                  <span>₹3L</span>
                  <span>₹2L</span>
                  <span>₹1L</span>
                  <span>₹0</span>
                </div>

                <div className="chart-area">

                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />

                  <svg
                    viewBox="0 0 700 220"
                    preserveAspectRatio="none"
                    className="chart-svg"
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopOpacity="0.25"
                        />

                        <stop
                          offset="100%"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      className="chart-fill"
                      d="
                        M0,180
                        C80,165 100,140 170,150
                        C230,160 250,110 320,120
                        C390,130 400,80 470,95
                        C530,110 570,55 630,65
                        C660,70 680,40 700,45
                        L700,220
                        L0,220
                        Z
                      "
                    />

                    <path
                      className="chart-line"
                      d="
                        M0,180
                        C80,165 100,140 170,150
                        C230,160 250,110 320,120
                        C390,130 400,80 470,95
                        C530,110 570,55 630,65
                        C660,70 680,40 700,45
                      "
                    />

                  </svg>

                  <div className="chart-months">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Quick Actions */}
            <div className="card quick-card">

              <div className="card-header">

                <div>
                  <h3>Quick Actions</h3>
                  <p>Manage your operations</p>
                </div>

              </div>

              <div className="quick-actions">

                {quickActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <button
                      className="quick-action"
                      key={index}
                    >

                      <div className="quick-icon">
                        <Icon size={20} />
                      </div>

                      <div>
                        <strong>{action.title}</strong>
                        <span>{action.description}</span>
                      </div>

                      <ArrowUpRight size={18} />

                    </button>
                  );
                })}

              </div>

              <div className="stock-alert">

                <div className="alert-icon">
                  <AlertTriangle size={20} />
                </div>

                <div>
                  <strong>Low Stock Alert</strong>
                  <span>12 medicines need attention</span>
                </div>

                <ArrowUpRight size={18} />

              </div>

            </div>

          </section>

          {/* Recent Orders */}
          <section className="card orders-card">

            <div className="card-header">

              <div>
                <h3>Recent Orders</h3>
                <p>Latest orders from your customers</p>
              </div>

              <button className="view-all">
                View All
                <ArrowUpRight size={16} />
              </button>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>DATE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order, index) => (

                    <tr key={index}>

                      <td>
                        <strong className="order-id">
                          {order.id}
                        </strong>
                      </td>

                      <td>
                        <div className="customer">
                          <div className="customer-avatar">
                            {order.customer.charAt(0)}
                          </div>

                          <span>
                            {order.customer}
                          </span>
                        </div>
                      </td>

                      <td>{order.date}</td>

                      <td>
                        <strong>{order.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`status ${order.status.toLowerCase()}`}
                        >
                          <span />
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <button className="more-button">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* Bottom Activity */}
          <section className="bottom-grid">

            <div className="card activity-card">

              <div className="card-header">

                <div>
                  <h3>Business Activity</h3>
                  <p>Today's operations summary</p>
                </div>

                <Activity size={22} />

              </div>

              <div className="activity-items">

                <div className="activity-item">
                  <div className="activity-icon blue">
                    <ShoppingCart size={18} />
                  </div>

                  <div>
                    <strong>24 New Orders</strong>
                    <span>Received today</span>
                  </div>

                  <b>+24</b>
                </div>

                <div className="activity-item">
                  <div className="activity-icon green">
                    <Package size={18} />
                  </div>

                  <div>
                    <strong>156 Medicines</strong>
                    <span>Stock updated</span>
                  </div>

                  <b>+156</b>
                </div>

                <div className="activity-item">
                  <div className="activity-icon purple">
                    <Truck size={18} />
                  </div>

                  <div>
                    <strong>8 Deliveries</strong>
                    <span>In transit</span>
                  </div>

                  <b>8</b>
                </div>

              </div>

            </div>

            <div className="card performance-card">

              <div className="card-header">

                <div>
                  <h3>Performance</h3>
                  <p>Overall business performance</p>
                </div>

                <span className="performance-percent">
                  87%
                </span>

              </div>

              <div className="performance-circle">

                <div className="circle-inner">
                  <strong>87%</strong>
                  <span>Excellent</span>
                </div>

              </div>

              <div className="performance-footer">
                <TrendingUp size={17} />
                <span>
                  Your business is performing
                  <strong> 12% better</strong> than last month.
                </span>
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default App;