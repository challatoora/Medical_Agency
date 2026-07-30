import {
Users,
Pill,
Package,
Truck,
ShoppingCart,
IndianRupee,
AlertTriangle,
TrendingUp,
ArrowUpRight,
ArrowDownRight,
Activity,
Clock,
CheckCircle2,
} from "lucide-react";

function Dashboard() {
const stats = [
{
title: "Total Users",
value: "1,248",
change: "+12.5%",
trend: "up",
icon: Users,
className: "blue",
},
{
title: "Total Medicines",
value: "3,642",
change: "+8.2%",
trend: "up",
icon: Pill,
className: "purple",
},
{
title: "Inventory Items",
value: "8,426",
change: "+5.7%",
trend: "up",
icon: Package,
className: "green",
},
{
title: "Suppliers",
value: "186",
change: "+3.1%",
trend: "up",
icon: Truck,
className: "orange",
},
{
title: "Total Orders",
value: "2,856",
change: "+14.8%",
trend: "up",
icon: ShoppingCart,
className: "pink",
},
{
title: "Total Billing",
value: "₹12.8L",
change: "+18.4%",
trend: "up",
icon: IndianRupee,
className: "cyan",
},
];

const recentOrders = [
{
id: "#ORD-10245",
customer: "Apollo Pharmacy",
amount: "₹24,850",
status: "Completed",
date: "Today, 10:32 AM",
},
{
id: "#ORD-10244",
customer: "MedPlus",
amount: "₹18,420",
status: "Processing",
date: "Today, 09:18 AM",
},
{
id: "#ORD-10243",
customer: "Sri Sai Medicals",
amount: "₹12,750",
status: "Completed",
date: "Yesterday, 05:42 PM",
},
{
id: "#ORD-10242",
customer: "HealthCare Plus",
amount: "₹31,200",
status: "Pending",
date: "Yesterday, 02:15 PM",
},
{
id: "#ORD-10241",
customer: "City Medical Store",
amount: "₹9,850",
status: "Completed",
date: "28 Jul, 11:25 AM",
},
];

const lowStock = [
{
medicine: "Paracetamol 500mg",
category: "Tablets",
stock: 12,
level: "Critical",
},
{
medicine: "Amoxicillin 250mg",
category: "Capsules",
stock: 24,
level: "Low",
},
{
medicine: "Azithromycin 500mg",
category: "Tablets",
stock: 31,
level: "Low",
},
{
medicine: "Cetirizine 10mg",
category: "Tablets",
stock: 18,
level: "Critical",
},
];

const chartData = [
{ day: "Mon", sales: 55, orders: 40 },
{ day: "Tue", sales: 70, orders: 52 },
{ day: "Wed", sales: 48, orders: 35 },
{ day: "Thu", sales: 82, orders: 65 },
{ day: "Fri", sales: 68, orders: 50 },
{ day: "Sat", sales: 92, orders: 78 },
{ day: "Sun", sales: 76, orders: 60 },
];

return ( <div className="dashboard-page">


  {/* Dashboard Header */}
  <div className="dashboard-heading">
    <div>
      <div className="welcome-label">
        <Activity size={16} />
        <span>Medical Agency Overview</span>
      </div>

      <h1>Good Morning, Admin 👋</h1>

      <p>
        Here's what's happening with your medical agency today.
      </p>
    </div>

    <div className="dashboard-date">
      <Clock size={17} />
      <span>Thursday, July 30, 2026</span>
    </div>
  </div>

  {/* Statistics Cards */}
  <div className="stats-grid">
    {stats.map((stat) => {
      const Icon = stat.icon;

      return (
        <div className="stat-card" key={stat.title}>

          <div className={`stat-icon ${stat.className}`}>
            <Icon size={23} />
          </div>

          <div className="stat-content">
            <span className="stat-title">
              {stat.title}
            </span>

            <h2>{stat.value}</h2>

            <div className="stat-change">
              <ArrowUpRight size={15} />
              <span>{stat.change}</span>
              <small>from last month</small>
            </div>
          </div>

        </div>
      );
    })}
  </div>

  {/* Main Dashboard Grid */}
  <div className="dashboard-main-grid">

    {/* Sales Chart */}
    <div className="dashboard-card sales-card">

      <div className="card-header">
        <div>
          <h3>Sales & Orders Overview</h3>
          <p>Weekly performance analytics</p>
        </div>

        <select className="period-select">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
        </select>
      </div>

      <div className="chart-summary">
        <div>
          <span>Total Sales</span>
          <strong>₹4,82,650</strong>
        </div>

        <div>
          <span>Total Orders</span>
          <strong>486</strong>
        </div>

        <div className="positive-summary">
          <TrendingUp size={17} />
          <span>+18.4%</span>
        </div>
      </div>

      <div className="sales-chart">

        <div className="chart-y-axis">
          <span>100k</span>
          <span>75k</span>
          <span>50k</span>
          <span>25k</span>
          <span>0</span>
        </div>

        <div className="chart-area">

          <div className="chart-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="bars-container">
            {chartData.map((item) => (
              <div className="chart-column" key={item.day}>

                <div className="bars">

                  <div
                    className="sales-bar"
                    style={{ height: `${item.sales}%` }}
                    title={`Sales: ${item.sales}%`}
                  ></div>

                  <div
                    className="orders-bar"
                    style={{ height: `${item.orders}%` }}
                    title={`Orders: ${item.orders}%`}
                  ></div>

                </div>

                <span className="chart-label">
                  {item.day}
                </span>

              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-sales"></i>
          Sales
        </span>

        <span>
          <i className="legend-orders"></i>
          Orders
        </span>
      </div>

    </div>

    {/* Low Stock */}
    <div className="dashboard-card low-stock-card">

      <div className="card-header">
        <div>
          <h3>Low Stock Medicines</h3>
          <p>Items requiring attention</p>
        </div>

        <div className="warning-count">
          <AlertTriangle size={16} />
          4
        </div>
      </div>

      <div className="low-stock-list">

        {lowStock.map((item) => (
          <div className="stock-item" key={item.medicine}>

            <div className="medicine-icon">
              <Pill size={18} />
            </div>

            <div className="medicine-info">
              <strong>{item.medicine}</strong>
              <span>{item.category}</span>
            </div>

            <div className="stock-status">
              <strong>{item.stock}</strong>

              <span
                className={
                  item.level === "Critical"
                    ? "critical"
                    : "low"
                }
              >
                {item.level}
              </span>
            </div>

          </div>
        ))}

      </div>

      <button className="view-all-btn">
        View Inventory
        <ArrowUpRight size={16} />
      </button>

    </div>

  </div>

  {/* Bottom Dashboard Grid */}
  <div className="dashboard-bottom-grid">

    {/* Recent Orders */}
    <div className="dashboard-card orders-card">

      <div className="card-header">
        <div>
          <h3>Recent Orders</h3>
          <p>Latest medical agency orders</p>
        </div>

        <button className="view-all-link">
          View All
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="orders-table-wrapper">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {recentOrders.map((order) => (
              <tr key={order.id}>

                <td>
                  <strong className="order-id">
                    {order.id}
                  </strong>
                </td>

                <td>{order.customer}</td>

                <td>
                  <strong>{order.amount}</strong>
                </td>

                <td>

                  <span
                    className={`order-status ${order.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >

                    {order.status === "Completed" && (
                      <CheckCircle2 size={14} />
                    )}

                    {order.status === "Processing" && (
                      <Activity size={14} />
                    )}

                    {order.status === "Pending" && (
                      <Clock size={14} />
                    )}

                    {order.status}

                  </span>

                </td>

                <td className="order-date">
                  {order.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* Quick Overview */}
    <div className="dashboard-card overview-card">

      <div className="card-header">
        <div>
          <h3>Agency Overview</h3>
          <p>Today's business summary</p>
        </div>
      </div>

      <div className="overview-list">

        <div className="overview-item">
          <div className="overview-item-icon users">
            <Users size={19} />
          </div>

          <div>
            <span>Active Users</span>
            <strong>842</strong>
          </div>

          <span className="overview-percent">
            67%
          </span>
        </div>

        <div className="overview-item">
          <div className="overview-item-icon inventory">
            <Package size={19} />
          </div>

          <div>
            <span>Stock Availability</span>
            <strong>92%</strong>
          </div>

          <span className="overview-percent">
            92%
          </span>
        </div>

        <div className="overview-item">
          <div className="overview-item-icon suppliers">
            <Truck size={19} />
          </div>

          <div>
            <span>Active Suppliers</span>
            <strong>164</strong>
          </div>

          <span className="overview-percent">
            88%
          </span>
        </div>

        <div className="overview-item">
          <div className="overview-item-icon orders">
            <ShoppingCart size={19} />
          </div>

          <div>
            <span>Orders Delivered</span>
            <strong>2,342</strong>
          </div>

          <span className="overview-percent">
            82%
          </span>
        </div>

      </div>

      <div className="performance-box">

        <div className="performance-icon">
          <TrendingUp size={21} />
        </div>

        <div>
          <strong>Excellent Performance</strong>
          <p>
            Your agency is performing 18.4% better than last month.
          </p>
        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default Dashboard;
