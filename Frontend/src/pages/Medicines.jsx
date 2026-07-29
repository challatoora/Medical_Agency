import { useEffect, useState } from "react";

import { medicineAPI } from "../services/api";


function Medicines() {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {

        fetchMedicines();

    }, []);


    const fetchMedicines = async () => {

        try {

            const response =
                await medicineAPI.get("/medicines");

            setMedicines(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch medicines",
                error
            );

        }

    };


    return (

        <div>

            <h1>Medicines</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                    </tr>

                </thead>

                <tbody>

                    {medicines.map((medicine) => (

                        <tr key={medicine.id}>

                            <td>
                                {medicine.id}
                            </td>

                            <td>
                                {medicine.name}
                            </td>

                            <td>
                                {medicine.category}
                            </td>

                            <td>
                                {medicine.price}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Medicines;