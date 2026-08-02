const express = require("express");

const router = express.Router();

const medicineController = require("../controllers/medicineController");

// GET ALL MEDICINES
router.get(
  "/",
  medicineController.getMedicines
);

// GET MEDICINE BY ID
router.get(
  "/:id",
  medicineController.getMedicineById
);

// ADD MEDICINE
router.post(
  "/",
  medicineController.addMedicine
);

// UPDATE MEDICINE
router.put(
  "/:id",
  medicineController.updateMedicine
);

// DELETE MEDICINE
router.delete(
  "/:id",
  medicineController.deleteMedicine
);

module.exports = router;