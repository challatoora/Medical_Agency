import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Orders.css";

function Orders() {

const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

// ==============================
// GET LOGGED-IN USER
// ==============================

const user =
JSON.parse(
localStorage.getItem("user")
) || {};

const isAdmin =
user.role?.toLowerCase().trim() === "admin";

// ==============================
// LOAD ORDERS
// ==============================

const loadOrders = async () => {


try {

  setLoading(true);

  let response;

  if (isAdmin) {

    // ==============================
    // ADMIN - SEE ALL ORDERS
    // ==============================

    response =
      await orderAPI.getAll();

  } else {

    // ==============================
    // USER - SEE ONLY OWN ORDERS
    // ==============================

    const userId =
      user.id ||
      user._id;

    if (!userId) {

      console.error(
        "User ID not found:",
        user
      );

      setOrders([]);

      return;
    }

    response =
      await orderAPI.getByUserId(
        userId
      );

  }

  console.log(
    "Logged-in user:",
    user
  );

  console.log(
    "Is Admin:",
    isAdmin
  );

  console.log(
    "Orders:",
    response
  );

  setOrders(
    Array.isArray(response)
      ? response
      : []
  );

} catch (error) {

  console.error(
    "Failed to load orders:",
    error
  );

  alert(
    "Failed to load orders"
  );

} finally {

  setLoading(false);

}


};

// ==============================
// LOAD ORDERS ON PAGE OPEN
// ==============================

useEffect(() => {


loadOrders();


}, []);

// ==============================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ==============================

const updateStatus = async (
order,
newStatus
) => {


// ==============================
// SECURITY CHECK
// ==============================

if (!isAdmin) {

  alert(
    "Only Admin can change order status."
  );

  return;
}

try {

  await orderAPI.update(
    order.id,
    {
      customer_name:
        order.customer_name,

      medicine_name:
        order.medicine_name,

      quantity:
        order.quantity,

      total_price:
        order.total_price,

      status:
        newStatus
    }
  );

  alert(
    "Order status updated successfully"
  );

  loadOrders();

} catch (error) {

  console.error(
    "Status update failed:",
    error
  );

  alert(
    "Failed to update order status"
  );

}


};

// ==============================
// DELETE ORDER
// ADMIN ONLY
// ==============================

const deleteOrder = async (
id
) => {


// ==============================
// SECURITY CHECK
// ==============================

if (!isAdmin) {

  alert(
    "Only Admin can delete orders."
  );

  return;
}

const confirmDelete =
  window.confirm(
    "Are you sure you want to delete this order?"
  );

if (!confirmDelete) {

  return;

}

try {

  await orderAPI.delete(id);

  alert(
    "Order deleted successfully"
  );

  loadOrders();

} catch (error) {

  console.error(
    "Delete order failed:",
    error
  );

  alert(
    "Failed to delete order"
  );

}


};

// ==============================
// LOADING
// ==============================

if (loading) {


return (

  <div className="orders-page">

    <h1>
      Orders
    </h1>

    <div className="orders-card">

      <h2>
        Loading Orders...
      </h2>

    </div>

  </div>

);


}

// ==============================
// RETURN UI
// ==============================

return (


<div className="orders-page">

  <div className="orders-header">

    <div>

      <h1>
        Orders
      </h1>

      <p>
        {isAdmin
          ? "Manage all customer orders"
          : "View your orders"
        }
      </p>

    </div>

    <button
      className="refresh-orders-btn"
      onClick={loadOrders}
    >
      Refresh
    </button>

  </div>

  <div className="orders-card">

    {orders.length === 0 ? (

      <h2>
        No Orders Found
      </h2>

    ) : (

      <table
        className="orders-table"
      >

        <thead>

          <tr>

            <th>
              Order ID
            </th>

            <th>
              Customer
            </th>

            <th>
              Medicine
            </th>

            <th>
              Quantity
            </th>

            <th>
              Total Price
            </th>

            <th>
              Order Date
            </th>

            <th>
              Status
            </th>

            {isAdmin && (

              <th>
                Action
              </th>

            )}

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order) => (

              <tr
                key={
                  order.id
                }
              >

                <td>
                  #{order.id}
                </td>

                <td>
                  {
                    order.customer_name
                  }
                </td>

                <td>
                  {
                    order.medicine_name
                  }
                </td>

                <td>
                  {
                    order.quantity
                  }
                </td>

                <td>
                  ₹
                  {
                    order.total_price
                  }
                </td>

                <td>

                  {
                    order.order_date
                      ? new Date(
                          order.order_date
                        ).toLocaleString()
                      : "-"
                  }

                </td>

                <td>

                  {isAdmin ? (

                    // ==============================
                    // ADMIN CAN CHANGE STATUS
                    // ==============================

                    <select

                      value={
                        order.status ||
                        "Pending"
                      }

                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          order,
                          e.target.value
                        )
                      }

                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  ) : (

                    // ==============================
                    // USER CAN ONLY VIEW STATUS
                    // ==============================

                    <span>

                      {
                        order.status ||
                        "Pending"
                      }

                    </span>

                  )}

                </td>

                {isAdmin && (

                  <td>

                    <button

                      className=
                        "delete-order-btn"

                      onClick={() =>
                        deleteOrder(
                          order.id
                        )
                      }

                    >

                      Delete

                    </button>

                  </td>

                )}

              </tr>

            )
          )}

        </tbody>

      </table>

    )}

  </div>

</div>


);

}

export default Orders;
