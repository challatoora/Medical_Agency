// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Pill,
//   Package,
//   Truck,
//   ShoppingCart,
//   CreditCard,
//   Users,
//   Settings,
//   LogOut,
//   Search,
//   Bell,
//   ChevronDown,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   ArrowUpRight,
//   Plus,
//   MoreHorizontal,
//   Activity,
//   DollarSign,
//   Boxes,
//   Menu,
//   X,
// } from "lucide-react";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   /* =========================
//      SIDEBAR MENU
//   ========================= */

//   const menuItems = [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       active: true,
//     },
//     {
//       icon: Pill,
//       label: "Medicines",
//     },
//     {
//       icon: Package,
//       label: "Inventory",
//     },
//     {
//       icon: Truck,
//       label: "Suppliers",
//     },
//     {
//       icon: ShoppingCart,
//       label: "Orders",
//     },
//     {
//       icon: CreditCard,
//       label: "Billing",
//     },
//     {
//       icon: Users,
//       label: "Users",
//     },
//   ];

//   /* =========================
//      STATS
//   ========================= */

//   const stats = [
//     {
//       title: "Total Revenue",
//       value: "₹12,48,500",
//       change: "+12.5%",
//       positive: true,
//       icon: DollarSign,
//       color: "blue",
//     },
//     {
//       title: "Total Orders",
//       value: "1,248",
//       change: "+8.2%",
//       positive: true,
//       icon: ShoppingCart,
//       color: "purple",
//     },
//     {
//       title: "Stock Available",
//       value: "8,452",
//       change: "-2.4%",
//       positive: false,
//       icon: Boxes,
//       color: "green",
//     },
//     {
//       title: "Active Suppliers",
//       value: "128",
//       change: "+5.1%",
//       positive: true,
//       icon: Users,
//       color: "orange",
//     },
//   ];

//   /* =========================
//      ORDERS
//   ========================= */

//   const orders = [
//     {
//       id: "#ORD-1024",
//       customer: "Apollo Pharmacy",
//       date: "30 Jul 2026",
//       amount: "₹24,500",
//       status: "Completed",
//     },
//     {
//       id: "#ORD-1023",
//       customer: "MedPlus",
//       date: "30 Jul 2026",
//       amount: "₹18,200",
//       status: "Processing",
//     },
//     {
//       id: "#ORD-1022",
//       customer: "Care Pharmacy",
//       date: "29 Jul 2026",
//       amount: "₹32,800",
//       status: "Completed",
//     },
//     {
//       id: "#ORD-1021",
//       customer: "Sri Sai Medicals",
//       date: "29 Jul 2026",
//       amount: "₹12,600",
//       status: "Pending",
//     },
//   ];

//   /* =========================
//      QUICK ACTIONS
//   ========================= */

//   const quickActions = [
//     {
//       icon: Pill,
//       title: "Add Medicine",
//       description: "Add new medicine",
//     },
//     {
//       icon: Truck,
//       title: "Add Supplier",
//       description: "Register supplier",
//     },
//     {
//       icon: ShoppingCart,
//       title: "Create Order",
//       description: "Create new order",
//     },
//   ];

//   return (
//     <div className="app-container">

//       {/* =========================
//           MOBILE OVERLAY
//       ========================= */}

//       {sidebarOpen && (
//         <div
//           className="mobile-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* =========================
//           SIDEBAR
//       ========================= */}

//       <aside
//         className={`sidebar ${
//           sidebarOpen ? "sidebar-open" : ""
//         }`}
//       >

//         {/* BRAND */}

//         <div className="brand">

//           <div className="brand-logo">
//             <Pill size={26} />
//           </div>

//           <div>
//             <h2>CMR MEDICAL</h2>
//             <span>AGENCY</span>
//           </div>

//           <button
//             className="mobile-close"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X size={22} />
//           </button>

//         </div>


//         {/* MAIN MENU */}

//         <div className="sidebar-section">

//           <p className="section-title">
//             MAIN MENU
//           </p>

//           <nav>

//             {menuItems.map((item, index) => {

//               const Icon = item.icon;

//               return (
//                 <button
//                   key={index}
//                   className={`nav-item ${
//                     item.active ? "active" : ""
//                   }`}
//                   onClick={() =>
//                     setSidebarOpen(false)
//                   }
//                 >

//                   <Icon size={20} />

//                   <span>
//                     {item.label}
//                   </span>

//                   {item.active && (
//                     <div className="active-indicator" />
//                   )}

//                 </button>
//               );

//             })}

//           </nav>

//         </div>


//         {/* =========================
//             SIDEBAR BOTTOM
//         ========================= */}

//         <div className="sidebar-bottom">

//           {/* SETTINGS */}

//           <button className="nav-item">

//             <Settings size={20} />

//             <span>
//               Settings
//             </span>

//           </button>


//           {/* LOGOUT */}

//           <button className="nav-item logout">

//             <LogOut size={20} />

//             <span>
//               Logout
//             </span>

//           </button>


//           {/* USER SECTION */}

//           <div className="sidebar-user">

//             <div className="user-avatar">
//               MR
//             </div>

//             <div className="user-details">

//               <strong>
//                 Admin User
//               </strong>

//               <span>
//                 Administrator
//               </span>

//             </div>

//             <button className="user-more">

//               <MoreHorizontal size={18} />

//             </button>

//           </div>

//         </div>

//       </aside>


//       {/* =========================
//           MAIN CONTENT
//       ========================= */}

//       <main className="main-content">


//         {/* =========================
//             HEADER
//         ========================= */}

//         <header className="header">


//           {/* MOBILE MENU */}

//           <div className="mobile-menu">

//             <button
//               onClick={() =>
//                 setSidebarOpen(true)
//               }
//             >
//               <Menu size={24} />
//             </button>

//           </div>


//           {/* SEARCH */}

//           <div className="search-box">

//             <Search size={20} />

//             <input
//               type="text"
//               placeholder="Search medicines, orders, suppliers..."
//             />

//             <span className="search-shortcut">
//               ⌘ K
//             </span>

//           </div>


//           {/* HEADER RIGHT */}

//           <div className="header-right">


//             {/* NOTIFICATION */}

//             <button className="notification">

//               <Bell size={21} />

//               <span className="notification-dot" />

//             </button>


//             <div className="header-divider" />


//             {/* PROFILE */}

//             <div className="profile">

//               <div className="profile-avatar">
//                 MR
//               </div>

//               <div className="profile-info">

//                 <strong>
//                   Murali Reddy
//                 </strong>

//                 <span>
//                   Administrator
//                 </span>

//               </div>

//               <ChevronDown size={18} />

//             </div>

//           </div>

//         </header>


//         {/* =========================
//             DASHBOARD
//         ========================= */}

//         <div className="dashboard">


//           {/* WELCOME */}

//           <section className="welcome-section">

//             <div>

//               <p className="welcome-label">
//                 Thursday, July 30, 2026
//               </p>

//               <h1>
//                 Good Morning, Murali
//                 <span> 👋</span>
//               </h1>

//               <p className="welcome-description">
//                 Here's what's happening with your medical agency today.
//               </p>

//             </div>


//             <button className="primary-button">

//               <Plus size={19} />

//               New Order

//             </button>

//           </section>


//           {/* =========================
//               STATS
//           ========================= */}

//           <section className="stats-grid">

//             {stats.map((stat, index) => {

//               const Icon = stat.icon;

//               return (

//                 <div
//                   className={`stat-card ${stat.color}`}
//                   key={index}
//                 >

//                   <div className="stat-top">

//                     <div className="stat-icon">

//                       <Icon size={22} />

//                     </div>

//                     <button className="more-button">

//                       <MoreHorizontal size={20} />

//                     </button>

//                   </div>

//                   <p>
//                     {stat.title}
//                   </p>

//                   <div className="stat-bottom">

//                     <h2>
//                       {stat.value}
//                     </h2>

//                     <span
//                       className={`stat-change ${
//                         stat.positive
//                           ? "positive"
//                           : "negative"
//                       }`}
//                     >

//                       {stat.positive ? (
//                         <TrendingUp size={14} />
//                       ) : (
//                         <TrendingDown size={14} />
//                       )}

//                       {stat.change}

//                     </span>

//                   </div>

//                 </div>

//               );

//             })}

//           </section>


//           {/* =========================
//               MAIN DASHBOARD GRID
//           ========================= */}

//           <section className="dashboard-grid">


//             {/* REVENUE */}

//             <div className="card revenue-card">

//               <div className="card-header">

//                 <div>

//                   <h3>
//                     Revenue Overview
//                   </h3>

//                   <p>
//                     Monthly revenue performance
//                   </p>

//                 </div>

//                 <select>

//                   <option>
//                     Last 7 Months
//                   </option>

//                   <option>
//                     Last 30 Days
//                   </option>

//                   <option>
//                     This Year
//                   </option>

//                 </select>

//               </div>


//               <div className="revenue-summary">

//                 <h2>
//                   ₹12,48,500
//                 </h2>

//                 <span className="positive">

//                   <TrendingUp size={15} />

//                   12.5% vs last month

//                 </span>

//               </div>


//               {/* CHART */}

//               <div className="chart">

//                 <div className="chart-y-axis">

//                   <span>₹4L</span>
//                   <span>₹3L</span>
//                   <span>₹2L</span>
//                   <span>₹1L</span>
//                   <span>₹0</span>

//                 </div>


//                 <div className="chart-area">

//                   <div className="chart-grid-line" />
//                   <div className="chart-grid-line" />
//                   <div className="chart-grid-line" />
//                   <div className="chart-grid-line" />


//                   <svg
//                     viewBox="0 0 700 220"
//                     preserveAspectRatio="none"
//                     className="chart-svg"
//                   >

//                     <defs>

//                       <linearGradient
//                         id="areaGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >

//                         <stop
//                           offset="0%"
//                           stopOpacity="0.25"
//                         />

//                         <stop
//                           offset="100%"
//                           stopOpacity="0"
//                         />

//                       </linearGradient>

//                     </defs>


//                     <path
//                       className="chart-fill"
//                       d="
//                         M0,180
//                         C80,165 100,140 170,150
//                         C230,160 250,110 320,120
//                         C390,130 400,80 470,95
//                         C530,110 570,55 630,65
//                         C660,70 680,40 700,45
//                         L700,220
//                         L0,220
//                         Z
//                       "
//                     />


//                     <path
//                       className="chart-line"
//                       d="
//                         M0,180
//                         C80,165 100,140 170,150
//                         C230,160 250,110 320,120
//                         C390,130 400,80 470,95
//                         C530,110 570,55 630,65
//                         C660,70 680,40 700,45
//                       "
//                     />

//                   </svg>


//                   <div className="chart-months">

//                     <span>Jan</span>
//                     <span>Feb</span>
//                     <span>Mar</span>
//                     <span>Apr</span>
//                     <span>May</span>
//                     <span>Jun</span>
//                     <span>Jul</span>

//                   </div>

//                 </div>

//               </div>

//             </div>


//             {/* QUICK ACTIONS */}

//             <div className="card quick-card">

//               <div className="card-header">

//                 <div>

//                   <h3>
//                     Quick Actions
//                   </h3>

//                   <p>
//                     Manage your operations
//                   </p>

//                 </div>

//               </div>


//               <div className="quick-actions">

//                 {quickActions.map(
//                   (action, index) => {

//                     const Icon = action.icon;

//                     return (

//                       <button
//                         className="quick-action"
//                         key={index}
//                       >

//                         <div className="quick-icon">

//                           <Icon size={20} />

//                         </div>

//                         <div>

//                           <strong>
//                             {action.title}
//                           </strong>

//                           <span>
//                             {action.description}
//                           </span>

//                         </div>

//                         <ArrowUpRight size={18} />

//                       </button>

//                     );

//                   }
//                 )}

//               </div>


//               {/* STOCK ALERT */}

//               <div className="stock-alert">

//                 <div className="alert-icon">

//                   <AlertTriangle size={20} />

//                 </div>

//                 <div>

//                   <strong>
//                     Low Stock Alert
//                   </strong>

//                   <span>
//                     12 medicines need attention
//                   </span>

//                 </div>

//                 <ArrowUpRight size={18} />

//               </div>

//             </div>

//           </section>


//           {/* =========================
//               RECENT ORDERS
//           ========================= */}

//           <section className="card orders-card">

//             <div className="card-header">

//               <div>

//                 <h3>
//                   Recent Orders
//                 </h3>

//                 <p>
//                   Latest orders from your customers
//                 </p>

//               </div>

//               <button className="view-all">

//                 View All

//                 <ArrowUpRight size={16} />

//               </button>

//             </div>


//             <div className="table-wrapper">

//               <table>

//                 <thead>

//                   <tr>

//                     <th>
//                       ORDER ID
//                     </th>

//                     <th>
//                       CUSTOMER
//                     </th>

//                     <th>
//                       DATE
//                     </th>

//                     <th>
//                       AMOUNT
//                     </th>

//                     <th>
//                       STATUS
//                     </th>

//                     <th />

//                   </tr>

//                 </thead>


//                 <tbody>

//                   {orders.map(
//                     (order, index) => (

//                       <tr key={index}>

//                         <td>

//                           <strong className="order-id">
//                             {order.id}
//                           </strong>

//                         </td>


//                         <td>

//                           <div className="customer">

//                             <div className="customer-avatar">

//                               {order.customer.charAt(
//                                 0
//                               )}

//                             </div>

//                             <span>
//                               {order.customer}
//                             </span>

//                           </div>

//                         </td>


//                         <td>
//                           {order.date}
//                         </td>


//                         <td>

//                           <strong>
//                             {order.amount}
//                           </strong>

//                         </td>


//                         <td>

//                           <span
//                             className={`status ${order.status.toLowerCase()}`}
//                           >

//                             <span />

//                             {order.status}

//                           </span>

//                         </td>


//                         <td>

//                           <button className="more-button">

//                             <MoreHorizontal size={20} />

//                           </button>

//                         </td>

//                       </tr>

//                     )
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           </section>


//           {/* =========================
//               BOTTOM GRID
//           ========================= */}

//           <section className="bottom-grid">


//             {/* BUSINESS ACTIVITY */}

//             <div className="card activity-card">

//               <div className="card-header">

//                 <div>

//                   <h3>
//                     Business Activity
//                   </h3>

//                   <p>
//                     Today's operations summary
//                   </p>

//                 </div>

//                 <Activity size={22} />

//               </div>


//               <div className="activity-items">


//                 <div className="activity-item">

//                   <div className="activity-icon blue">

//                     <ShoppingCart size={18} />

//                   </div>

//                   <div>

//                     <strong>
//                       24 New Orders
//                     </strong>

//                     <span>
//                       Received today
//                     </span>

//                   </div>

//                   <b>
//                     +24
//                   </b>

//                 </div>


//                 <div className="activity-item">

//                   <div className="activity-icon green">

//                     <Package size={18} />

//                   </div>

//                   <div>

//                     <strong>
//                       156 Medicines
//                     </strong>

//                     <span>
//                       Stock updated
//                     </span>

//                   </div>

//                   <b>
//                     +156
//                   </b>

//                 </div>


//                 <div className="activity-item">

//                   <div className="activity-icon purple">

//                     <Truck size={18} />

//                   </div>

//                   <div>

//                     <strong>
//                       8 Deliveries
//                     </strong>

//                     <span>
//                       In transit
//                     </span>

//                   </div>

//                   <b>
//                     8
//                   </b>

//                 </div>


//               </div>

//             </div>


//             {/* PERFORMANCE */}

//             <div className="card performance-card">

//               <div className="card-header">

//                 <div>

//                   <h3>
//                     Performance
//                   </h3>

//                   <p>
//                     Overall business performance
//                   </p>

//                 </div>

//                 <span className="performance-percent">
//                   87%
//                 </span>

//               </div>


//               <div className="performance-circle">

//                 <div className="circle-inner">

//                   <strong>
//                     87%
//                   </strong>

//                   <span>
//                     Excellent
//                   </span>

//                 </div>

//               </div>


//               <div className="performance-footer">

//                 <TrendingUp size={17} />

//                 <span>

//                   Your business is performing

//                   <strong>
//                     {" "}12% better
//                   </strong>

//                   {" "}than last month.

//                 </span>

//               </div>

//             </div>


//           </section>

//         </div>

//       </main>

//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================
  // CURRENT PAGE
  // =========================

  const [currentPage, setCurrentPage] = useState("Dashboard");

  // =========================
  // USERS STATE
  // =========================

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");

  // =========================
  // SIDEBAR MENU
  // =========================

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: Pill,
      label: "Medicines",
    },
    {
      icon: Package,
      label: "Inventory",
    },
    {
      icon: Truck,
      label: "Suppliers",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
    },
    {
      icon: CreditCard,
      label: "Billing",
    },
    {
      icon: Users,
      label: "Users",
    },
  ];

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError("");

      const response = await fetch(
        "http://54.226.0.206:5006/api/users"
      );

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(
        "User Service Error:",
        error
      );

      setUsersError(
        "Unable to load users from User Service."
      );
    } finally {
      setUsersLoading(false);
    }
  };

  // =========================
  // LOAD USERS WHEN USERS PAGE
  // =========================

  useEffect(() => {
    if (currentPage === "Users") {
      fetchUsers();
    }
  }, [currentPage]);

  // =========================
  // STATS
  // =========================

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

  // =========================
  // ORDERS
  // =========================

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

  // =========================
  // QUICK ACTIONS
  // =========================

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

  // =========================
  // SIDEBAR CLICK
  // =========================

  const handleMenuClick = (label) => {
    setCurrentPage(label);
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        {/* BRAND */}

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
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <X size={22} />
          </button>

        </div>

        {/* MAIN MENU */}

        <div className="sidebar-section">

          <p className="section-title">
            MAIN MENU
          </p>

          <nav>

            {menuItems.map(
              (item, index) => {

                const Icon = item.icon;

                return (
                  <button
                    key={index}
                    className={`nav-item ${
                      currentPage ===
                      item.label
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleMenuClick(
                        item.label
                      )
                    }
                  >

                    <Icon size={20} />

                    <span>
                      {item.label}
                    </span>

                    {currentPage ===
                      item.label && (
                      <div className="active-indicator" />
                    )}

                  </button>
                );

              }
            )}

          </nav>

        </div>

        {/* =========================
            SIDEBAR BOTTOM
        ========================= */}

        <div className="sidebar-bottom">

          {/* SETTINGS */}

          <button className="nav-item">

            <Settings size={20} />

            <span>
              Settings
            </span>

          </button>

          {/* LOGOUT */}

          <button className="nav-item logout">

            <LogOut size={20} />

            <span>
              Logout
            </span>

          </button>

          {/* USER SECTION */}

          <div className="sidebar-user">

            <div className="user-avatar">
              MR
            </div>

            <div className="user-details">

              <strong>
                Admin User
              </strong>

              <span>
                Administrator
              </span>

            </div>

            <button className="user-more">

              <MoreHorizontal size={18} />

            </button>

          </div>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        {/* =========================
            HEADER
        ========================= */}

        <header className="header">

          {/* MOBILE MENU */}

          <div className="mobile-menu">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <Menu size={24} />
            </button>

          </div>

          {/* SEARCH */}

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

          {/* HEADER RIGHT */}

          <div className="header-right">

            {/* NOTIFICATION */}

            <button className="notification">

              <Bell size={21} />

              <span className="notification-dot" />

            </button>

            <div className="header-divider" />

            {/* PROFILE */}

            <div className="profile">

              <div className="profile-avatar">
                MR
              </div>

              <div className="profile-info">

                <strong>
                  Murali Reddy
                </strong>

                <span>
                  Administrator
                </span>

              </div>

              <ChevronDown size={18} />

            </div>

          </div>

        </header>

        {/* =====================================================
            USERS PAGE
        ====================================================== */}

        {currentPage === "Users" ? (

          <div className="dashboard">

            {/* USERS HEADER */}

            <section className="welcome-section">

              <div>

                <p className="welcome-label">
                  USER MANAGEMENT
                </p>

                <h1>
                  Users
                </h1>

                <p className="welcome-description">
                  Manage users in your medical agency.
                </p>

              </div>

              <button
                className="primary-button"
                onClick={fetchUsers}
              >
                <Users size={19} />

                Refresh Users
              </button>

            </section>

            {/* USERS CARD */}

            <section className="card orders-card">

              <div className="card-header">

                <div>

                  <h3>
                    All Users
                  </h3>

                  <p>
                    Users loaded from User Service
                  </p>

                </div>

                <div>
                  <strong>
                    {users.length} Users
                  </strong>
                </div>

              </div>

              {/* LOADING */}

              {usersLoading && (

                <div
                  style={{
                    padding:
                      "40px",
                    textAlign:
                      "center",
                    color:
                      "#64748b",
                  }}
                >
                  Loading users...
                </div>

              )}

              {/* ERROR */}

              {usersError && (

                <div
                  style={{
                    padding:
                      "20px",
                    marginTop:
                      "20px",
                    borderRadius:
                      "10px",
                    color:
                      "#dc2626",
                    background:
                      "#fef2f2",
                  }}
                >

                  {usersError}

                  <button
                    onClick={fetchUsers}
                    style={{
                      marginLeft:
                        "15px",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      color:
                        "#ffffff",
                      background:
                        "#2563eb",
                    }}
                  >
                    Retry
                  </button>

                </div>

              )}

              {/* USERS TABLE */}

              {!usersLoading &&
                !usersError && (

                  <div className="table-wrapper">

                    <table>

                      <thead>

                        <tr>

                          <th>
                            ID
                          </th>

                          <th>
                            USER
                          </th>

                          <th>
                            EMAIL
                          </th>

                          <th>
                            PHONE
                          </th>

                          <th>
                            ROLE
                          </th>

                          <th>
                            CREATED
                          </th>

                          <th>
                            ACTION
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {users.length ===
                        0 ? (

                          <tr>

                            <td
                              colSpan="7"
                              style={{
                                textAlign:
                                  "center",
                                padding:
                                  "40px",
                              }}
                            >
                              No users found
                            </td>

                          </tr>

                        ) : (

                          users.map(
                            (user) => (

                              <tr
                                key={
                                  user.id
                                }
                              >

                                {/* ID */}

                                <td>

                                  <strong>
                                    #
                                    {
                                      user.id
                                    }
                                  </strong>

                                </td>

                                {/* USER */}

                                <td>

                                  <div className="customer">

                                    <div className="customer-avatar">

                                      {user.name
                                        ?.charAt(
                                          0
                                        )
                                        .toUpperCase()}

                                    </div>

                                    <strong>
                                      {
                                        user.name
                                      }
                                    </strong>

                                  </div>

                                </td>

                                {/* EMAIL */}

                                <td>
                                  {
                                    user.email
                                  }
                                </td>

                                {/* PHONE */}

                                <td>
                                  {
                                    user.phone
                                  }
                                </td>

                                {/* ROLE */}

                                <td>

                                  <span className="status completed">

                                    <span />

                                    {
                                      user.role
                                    }

                                  </span>

                                </td>

                                {/* CREATED */}

                                <td>

                                  {user.created_at
                                    ? new Date(
                                        user.created_at
                                      ).toLocaleDateString(
                                        "en-IN"
                                      )
                                    : "-"}

                                </td>

                                {/* ACTION */}

                                <td>

                                  <button className="more-button">

                                    <MoreHorizontal
                                      size={20}
                                    />

                                  </button>

                                </td>

                              </tr>

                            )
                          )

                        )}

                      </tbody>

                    </table>

                  </div>

                )}

            </section>

          </div>

        ) : (

          /* =====================================================
             DASHBOARD PAGE
          ====================================================== */

          <div className="dashboard">

            {/* WELCOME */}

            <section className="welcome-section">

              <div>

                <p className="welcome-label">
                  Thursday, July 30, 2026
                </p>

                <h1>
                  Good Morning, Murali
                  <span>
                    {" "}👋
                  </span>
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

            {/* STATS */}

            <section className="stats-grid">

              {stats.map(
                (stat, index) => {

                  const Icon =
                    stat.icon;

                  return (

                    <div
                      className={`stat-card ${stat.color}`}
                      key={index}
                    >

                      <div className="stat-top">

                        <div className="stat-icon">

                          <Icon
                            size={22}
                          />

                        </div>

                        <button className="more-button">

                          <MoreHorizontal
                            size={20}
                          />

                        </button>

                      </div>

                      <p>
                        {
                          stat.title
                        }
                      </p>

                      <div className="stat-bottom">

                        <h2>
                          {
                            stat.value
                          }
                        </h2>

                        <span
                          className={`stat-change ${
                            stat.positive
                              ? "positive"
                              : "negative"
                          }`}
                        >

                          {stat.positive ? (
                            <TrendingUp
                              size={14}
                            />
                          ) : (
                            <TrendingDown
                              size={14}
                            />
                          )}

                          {
                            stat.change
                          }

                        </span>

                      </div>

                    </div>

                  );

                }
              )}

            </section>

            {/* MAIN DASHBOARD GRID */}

            <section className="dashboard-grid">

              {/* REVENUE */}

              <div className="card revenue-card">

                <div className="card-header">

                  <div>

                    <h3>
                      Revenue Overview
                    </h3>

                    <p>
                      Monthly revenue performance
                    </p>

                  </div>

                  <select>

                    <option>
                      Last 7 Months
                    </option>

                    <option>
                      Last 30 Days
                    </option>

                    <option>
                      This Year
                    </option>

                  </select>

                </div>

                <div className="revenue-summary">

                  <h2>
                    ₹12,48,500
                  </h2>

                  <span className="positive">

                    <TrendingUp
                      size={15}
                    />

                    12.5% vs last month

                  </span>

                </div>

                <div className="chart">

                  <div className="chart-y-axis">

                    <span>
                      ₹4L
                    </span>

                    <span>
                      ₹3L
                    </span>

                    <span>
                      ₹2L
                    </span>

                    <span>
                      ₹1L
                    </span>

                    <span>
                      ₹0
                    </span>

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

                      <span>
                        Jan
                      </span>

                      <span>
                        Feb
                      </span>

                      <span>
                        Mar
                      </span>

                      <span>
                        Apr
                      </span>

                      <span>
                        May
                      </span>

                      <span>
                        Jun
                      </span>

                      <span>
                        Jul
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="card quick-card">

                <div className="card-header">

                  <div>

                    <h3>
                      Quick Actions
                    </h3>

                    <p>
                      Manage your operations
                    </p>

                  </div>

                </div>

                <div className="quick-actions">

                  {quickActions.map(
                    (
                      action,
                      index
                    ) => {

                      const Icon =
                        action.icon;

                      return (

                        <button
                          className="quick-action"
                          key={index}
                        >

                          <div className="quick-icon">

                            <Icon
                              size={20}
                            />

                          </div>

                          <div>

                            <strong>
                              {
                                action.title
                              }
                            </strong>

                            <span>
                              {
                                action.description
                              }
                            </span>

                          </div>

                          <ArrowUpRight
                            size={18}
                          />

                        </button>

                      );

                    }
                  )}

                </div>

                <div className="stock-alert">

                  <div className="alert-icon">

                    <AlertTriangle
                      size={20}
                    />

                  </div>

                  <div>

                    <strong>
                      Low Stock Alert
                    </strong>

                    <span>
                      12 medicines need attention
                    </span>

                  </div>

                  <ArrowUpRight
                    size={18}
                  />

                </div>

              </div>

            </section>

            {/* RECENT ORDERS */}

            <section className="card orders-card">

              <div className="card-header">

                <div>

                  <h3>
                    Recent Orders
                  </h3>

                  <p>
                    Latest orders from your customers
                  </p>

                </div>

                <button className="view-all">

                  View All

                  <ArrowUpRight
                    size={16}
                  />

                </button>

              </div>

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>
                        ORDER ID
                      </th>

                      <th>
                        CUSTOMER
                      </th>

                      <th>
                        DATE
                      </th>

                      <th>
                        AMOUNT
                      </th>

                      <th>
                        STATUS
                      </th>

                      <th />

                    </tr>

                  </thead>

                  <tbody>

                    {orders.map(
                      (
                        order,
                        index
                      ) => (

                        <tr
                          key={index}
                        >

                          <td>

                            <strong className="order-id">
                              {
                                order.id
                              }
                            </strong>

                          </td>

                          <td>

                            <div className="customer">

                              <div className="customer-avatar">

                                {order.customer.charAt(
                                  0
                                )}

                              </div>

                              <span>
                                {
                                  order.customer
                                }
                              </span>

                            </div>

                          </td>

                          <td>
                            {
                              order.date
                            }
                          </td>

                          <td>

                            <strong>
                              {
                                order.amount
                              }
                            </strong>

                          </td>

                          <td>

                            <span
                              className={`status ${order.status.toLowerCase()}`}
                            >

                              <span />

                              {
                                order.status
                              }

                            </span>

                          </td>

                          <td>

                            <button className="more-button">

                              <MoreHorizontal
                                size={20}
                              />

                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </section>

            {/* BOTTOM GRID */}

            <section className="bottom-grid">

              {/* BUSINESS ACTIVITY */}

              <div className="card activity-card">

                <div className="card-header">

                  <div>

                    <h3>
                      Business Activity
                    </h3>

                    <p>
                      Today's operations summary
                    </p>

                  </div>

                  <Activity
                    size={22}
                  />

                </div>

                <div className="activity-items">

                  <div className="activity-item">

                    <div className="activity-icon blue">

                      <ShoppingCart
                        size={18}
                      />

                    </div>

                    <div>

                      <strong>
                        24 New Orders
                      </strong>

                      <span>
                        Received today
                      </span>

                    </div>

                    <b>
                      +24
                    </b>

                  </div>

                  <div className="activity-item">

                    <div className="activity-icon green">

                      <Package
                        size={18}
                      />

                    </div>

                    <div>

                      <strong>
                        156 Medicines
                      </strong>

                      <span>
                        Stock updated
                      </span>

                    </div>

                    <b>
                      +156
                    </b>

                  </div>

                  <div className="activity-item">

                    <div className="activity-icon purple">

                      <Truck
                        size={18}
                      />

                    </div>

                    <div>

                      <strong>
                        8 Deliveries
                      </strong>

                      <span>
                        In transit
                      </span>

                    </div>

                    <b>
                      8
                    </b>

                  </div>

                </div>

              </div>

              {/* PERFORMANCE */}

              <div className="card performance-card">

                <div className="card-header">

                  <div>

                    <h3>
                      Performance
                    </h3>

                    <p>
                      Overall business performance
                    </p>

                  </div>

                  <span className="performance-percent">
                    87%
                  </span>

                </div>

                <div className="performance-circle">

                  <div className="circle-inner">

                    <strong>
                      87%
                    </strong>

                    <span>
                      Excellent
                    </span>

                  </div>

                </div>

                <div className="performance-footer">

                  <TrendingUp
                    size={17}
                  />

                  <span>

                    Your business is performing

                    <strong>
                      {" "}12% better
                    </strong>

                    {" "}than last month.

                  </span>

                </div>

              </div>

            </section>

          </div>

        )}

      </main>

    </div>
  );
}

export default App;