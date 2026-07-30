// const db = require("../config/db");

// const getAllMedicines = (callback)=>{

// db.query("SELECT * FROM medicines",callback);

// };

// const addMedicine = (medicine,callback)=>{

// db.query(

// "INSERT INTO medicines SET ?",

// medicine,

// callback

// );

// };

// module.exports={

// getAllMedicines,

// addMedicine

// };
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        manufacturer: {
            type: String
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            default: 0
        },

        expiry_date: {
            type: Date
        },

        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Medicine",
    medicineSchema
);