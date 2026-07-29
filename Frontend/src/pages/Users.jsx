import React from "react";
import { useEffect, useState } from "react";

import { userAPI } from "../services/api";


function Users() {

    const [users, setUsers] = useState([]);


    useEffect(() => {

        fetchUsers();

    }, []);


    const fetchUsers = async () => {

        try {

            const response =
                await userAPI.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch users",
                error
            );

        }

    };


    return (

        <div>

            <h1>Users</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                {user.name}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.phone}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Users;