import React from "react";
import { useEffect, useState } from "react";

import { orderAPI } from "../services/api";


function Orders() {

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        fetchOrders();

    }, []);


    const fetchOrders = async () => {

        try {

            const response =
                await orderAPI.get("/orders");

            setOrders(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch orders",
                error
            );

        }

    };


    return (

        <div>

            <h1>Orders</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>User ID</th>

                        <th>Customer</th>

                        <th>Phone</th>

                        <th>Total</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.id}>

                            <td>
                                {order.id}
                            </td>

                            <td>
                                {order.user_id}
                            </td>

                            <td>
                                {order.customer_name}
                            </td>

                            <td>
                                {order.customer_phone}
                            </td>

                            <td>
                                {order.total_amount}
                            </td>

                            <td>
                                {order.order_status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Orders;