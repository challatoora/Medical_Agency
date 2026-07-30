import {
  Pill,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 32000 }
];

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="welcome-section">

        <div>
          <h1>Good morning, Admin 👋</h1>

          <p>
            Here's what's happening with your medical agency today.
          </p>
        </div>

        <button className="primary-button">
          + Add Medicine
        </button>

      </div>


      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon medicine">
            <Pill size={24} />
          </div>

          <div>
            <span>Total Medicines</span>
            <h2>1,248</h2>

            <small className="positive">
              <ArrowUpRight size={14} />
              12.5% this month
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon inventory">
            <Package size={24} />
          </div>

          <div>
            <span>Inventory Items</span>
            <h2>3,845</h2>

            <small className="positive">
              <ArrowUpRight size={14} />
              8.2% this month
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orders">
            <ShoppingCart size={24} />
          </div>

          <div>
            <span>Total Orders</span>
            <h2>186</h2>

            <small className="positive">
              <ArrowUpRight size={14} />
              15.3% this month
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon revenue">
            <DollarSign size={24} />
          </div>

          <div>
            <span>Total Revenue</span>
            <h2>$32,480</h2>

            <small className="positive">
              <ArrowUpRight size={14} />
              18.7% this month
            </small>
          </div>

        </div>

      </div>


      <div className="dashboard-grid">

        <div className="chart-card">

          <div className="card-header">

            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>

            <select>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        <div className="alert-card">

          <div className="card-header">

            <div>
              <h3>Low Stock Alert</h3>
              <p>Medicines requiring attention</p>
            </div>

            <AlertTriangle size={22} />

          </div>


          <div className="stock-item">

            <div>
              <strong>Paracetamol 500mg</strong>
              <span>Only 8 units remaining</span>
            </div>

            <span className="danger-badge">
              Critical
            </span>

          </div>


          <div className="stock-item">

            <div>
              <strong>Amoxicillin 250mg</strong>
              <span>Only 15 units remaining</span>
            </div>

            <span className="warning-badge">
              Low
            </span>

          </div>


          <div className="stock-item">

            <div>
              <strong>Ibuprofen 400mg</strong>
              <span>Only 22 units remaining</span>
            </div>

            <span className="warning-badge">
              Low
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;