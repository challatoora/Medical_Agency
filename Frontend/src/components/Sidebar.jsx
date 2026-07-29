function Sidebar({ setPage }) {

    return (

        <div className="sidebar">

            <h2>CMR Medical</h2>

            <button onClick={() => setPage("dashboard")}>
                Dashboard
            </button>

            <button onClick={() => setPage("medicines")}>
                Medicines
            </button>

            <button onClick={() => setPage("suppliers")}>
                Suppliers
            </button>

            <button onClick={() => setPage("inventory")}>
                Inventory
            </button>

            <button onClick={() => setPage("orders")}>
                Orders
            </button>

            <button onClick={() => setPage("billing")}>
                Billing
            </button>

            <button onClick={() => setPage("users")}>
                Users
            </button>

        </div>

    );

}

export default Sidebar;