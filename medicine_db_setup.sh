#!/bin/bash

echo "Creating Medicine Database and Collection..."

mongosh <<EOF

use medical_medicine_db

db.createCollection("medicines", {
    validator: {
        \$jsonSchema: {
            bsonType: "object",
            required: [
                "name",
                "category",
                "price"
            ],
            properties: {

                name: {
                    bsonType: "string",
                    description: "Medicine name"
                },

                category: {
                    bsonType: "string",
                    description: "Medicine category"
                },

                manufacturer: {
                    bsonType: "string",
                    description: "Medicine manufacturer"
                },

                price: {
                    bsonType: "number",
                    description: "Medicine price"
                },

                quantity: {
                    bsonType: "number",
                    description: "Available quantity"
                },

                expiry_date: {
                    bsonType: "date",
                    description: "Expiry date"
                },

                description: {
                    bsonType: "string",
                    description: "Medicine description"
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

print("Medicine collection created successfully")

EOF