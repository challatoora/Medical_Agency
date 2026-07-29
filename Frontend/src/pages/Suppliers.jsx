import { useEffect, useState } from "react";

import { supplierAPI } from "../services/api";


function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {

        fetchSuppliers();

    }, []);


    const fetchSuppliers = async () => {

        try {

            const response =
                await supplierAPI.get("/suppliers");

            setSuppliers(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch suppliers",
                error
            );

        }

    };


    return (

        <div>

            <h1>Suppliers</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Phone</th>

                        <th>Email</th>

                    </tr>

                </thead>

                <tbody>

                    {suppliers.map((supplier) => (

                        <tr key={supplier.id}>

                            <td>
                                {supplier.id}
                            </td>

                            <td>
                                {supplier.name}
                            </td>

                            <td>
                                {supplier.phone}
                            </td>

                            <td>
                                {supplier.email}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Suppliers;