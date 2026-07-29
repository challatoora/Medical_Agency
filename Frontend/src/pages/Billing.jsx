import React from "react";
import { useEffect, useState } from "react";

import { billingAPI } from "../services/api";


function Billing() {

    const [invoices, setInvoices] = useState([]);


    useEffect(() => {

        fetchInvoices();

    }, []);


    const fetchInvoices = async () => {

        try {

            const response =
                await billingAPI.get("/billing");

            setInvoices(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch invoices",
                error
            );

        }

    };


    return (

        <div>

            <h1>Billing</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Invoice</th>

                        <th>Order ID</th>

                        <th>Subtotal</th>

                        <th>Total</th>

                        <th>Payment</th>

                    </tr>

                </thead>

                <tbody>

                    {invoices.map((invoice) => (

                        <tr key={invoice.id}>

                            <td>
                                {invoice.id}
                            </td>

                            <td>
                                {invoice.invoice_number}
                            </td>

                            <td>
                                {invoice.order_id}
                            </td>

                            <td>
                                ${invoice.subtotal}
                            </td>

                            <td>
                                ${invoice.total_amount}
                            </td>

                            <td>
                                {invoice.payment_status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Billing;