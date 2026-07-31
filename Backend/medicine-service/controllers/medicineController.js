const Medicine = require("../models/medicineModel");

// Get all medicines
exports.getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({
            createdAt: -1
        });

        res.status(200).json(medicines);
    } catch (error) {
        console.error(
            "Error fetching medicines:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch medicines",
            error: error.message
        });
    }
};

// Add new medicine
exports.addMedicine = async (req, res) => {
    try {
        const {
            name,
            category,
            manufacturer,
            price,
            quantity,
            expiry_date,
            description
        } = req.body;

        const medicine = new Medicine({
            name,
            category,
            manufacturer,
            price,
            quantity,
            expiry_date,
            description
        });

        const savedMedicine = await medicine.save();

        res.status(201).json({
            message: "Medicine Added Successfully",
            medicine: savedMedicine
        });
    } catch (error) {
        console.error(
            "Error adding medicine:",
            error.message
        );

        res.status(500).json({
            message: "Failed to add medicine",
            error: error.message
        });
    }
};