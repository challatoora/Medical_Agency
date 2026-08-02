const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        company_name: {
            type: String
        },

        email: {
            type: String
        },

        phone: {
            type: String
        },

        address: {
            type: String
        },

        status: {
            type: String,
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Supplier",
    supplierSchema
);