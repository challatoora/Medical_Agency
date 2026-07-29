function Dashboard() {

    return (

        <div>

            <h1>Dashboard</h1>

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Medicines</h3>
                    <p>Manage Medicines</p>
                </div>

                <div className="card">
                    <h3>Suppliers</h3>
                    <p>Manage Suppliers</p>
                </div>

                <div className="card">
                    <h3>Inventory</h3>
                    <p>Manage Stock</p>
                </div>

                <div className="card">
                    <h3>Orders</h3>
                    <p>Manage Orders</p>
                </div>

                <div className="card">
                    <h3>Billing</h3>
                    <p>Manage Invoices</p>
                </div>

                <div className="card">
                    <h3>Users</h3>
                    <p>Manage Users</p>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;