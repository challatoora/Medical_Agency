const medicineModel = require("../models/medicineModel");

// GET ALL MEDICINES
exports.getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.find();

    res.status(200).json(medicines);
  } catch (error) {
    console.error("Get medicines error:", error);

    res.status(500).json({
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};

// GET MEDICINE BY ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await medicineModel.findById(
      req.params.id
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json(medicine);
  } catch (error) {
    console.error("Get medicine error:", error);

    res.status(500).json({
      message: "Failed to fetch medicine",
      error: error.message,
    });
  }
};

// // ADD MEDICINE
// exports.addMedicine = async (req, res) => {
//   try {
//     const medicine = await medicineModel.create(req.body);

//     res.status(201).json({
//       message: "Medicine Added Successfully",
//       medicine,
//     });
//   } catch (error) {
//     console.error("Add medicine error:", error);

//     res.status(500).json({
//       message: "Failed to add medicine",
//       error: error.message,
//     });
//   }
// };


// ADD MEDICINE
exports.addMedicine = async (req, res) => {
  try {
    console.log("========== ADD MEDICINE ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const medicine = await medicineModel.create(req.body);

    res.status(201).json({
      message: "Medicine Added Successfully",
      medicine,
    });
  } catch (error) {
    console.error("========== ADD MEDICINE ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: "Failed to add medicine",
      error: error.message,
    });
  }
};

// UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await medicineModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine Updated Successfully",
      medicine,
    });
  } catch (error) {
    console.error("Update medicine error:", error);

    res.status(500).json({
      message: "Failed to update medicine",
      error: error.message,
    });
  }
};

// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await medicineModel.findByIdAndDelete(
      req.params.id
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete medicine error:", error);

    res.status(500).json({
      message: "Failed to delete medicine",
      error: error.message,
    });
  }
};