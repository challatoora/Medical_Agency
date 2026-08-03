#!/bin/bash

echo "Creating Supplier Database and Collection..."

mongosh <<EOF

use medical_supplier_db

db.createCollection("suppliers", {
    validator: {
        \$jsonSchema: {
            bsonType: "object",
            required: [
                "name"
            ],
            properties: {

                name: {
                    bsonType: "string",
                    description: "Supplier name"
                },

                company_name: {
                    bsonType: "string",
                    description: "Company name"
                },

                email: {
                    bsonType: "string",
                    description: "Supplier email"
                },

                phone: {
                    bsonType: "string",
                    description: "Supplier phone number"
                },

                address: {
                    bsonType: "string",
                    description: "Supplier address"
                },

                status: {
                    bsonType: "string",
                    description: "Supplier status"
                },

                createdAt: {
                    bsonType: "date"
                },

                updatedAt: {
                    bsonType: "date"
                }
            }
        }
    }
})

print("Supplier collection created successfully")

EOF