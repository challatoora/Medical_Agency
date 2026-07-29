import React from "react";
import { useEffect, useState } from "react";

import { inventoryAPI } from "../services/api";


function Inventory() {

    const [inventory, setInventory] = useState([]);


    useEffect(() => {

        fetchInventory();

    }, []);


    const fetchInventory = async () => {

        try {

            const response =
                await inventoryAPI.get("/inventory");

            setInventory(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch inventory",
                error
            );

        }

    };


    return (

        <div>

            <h1>Inventory</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Medicine ID</th>

                        <th>Supplier ID</th>

                        <th>Batch</th>

                        <th>Quantity</th>

                        <th>Expiry</th>

                    </tr>

                </thead>

                <tbody>

                    {inventory.map((item) => (

                        <tr key={item.id}>

                            <td>
                                {item.id}
                            </td>

                            <td>
                                {item.medicine_id}
                            </td>

                            <td>
                                {item.supplier_id}
                            </td>

                            <td>
                                {item.batch_number}
                            </td>

                            <td>
                                {item.quantity}
                            </td>

                            <td>
                                {item.expiry_date}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Inventory;