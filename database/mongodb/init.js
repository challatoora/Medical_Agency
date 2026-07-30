// ==========================================
// MEDICAL AGENCY MONGODB INITIALIZATION
// ==========================================


// ==========================================
// MEDICINE DATABASE
// ==========================================

use("medicine_db");

db.medicines.insertOne({
    name: "Paracetamol",
    manufacturer: "Sample Pharma",
    category: "Pain Relief",
    price: 50,
    quantity: 100,
    createdAt: new Date()
});


// ==========================================
// INVENTORY DATABASE
// ==========================================

use("inventory_db");

db.inventory.insertOne({
    medicineId: "sample-medicine-001",
    quantity: 100,
    batchNumber: "BATCH001",
    expiryDate: new Date("2027-12-31"),
    reorderLevel: 10,
    createdAt: new Date()
});


// ==========================================
// SUPPLIER DATABASE
// ==========================================

use("supplier_db");

db.suppliers.insertOne({
    name: "Sample Medical Supplier",
    email: "supplier@example.com",
    phone: "9999999999",
    address: "Hyderabad, India",
    createdAt: new Date()
});


print("MongoDB initialization completed successfully.");