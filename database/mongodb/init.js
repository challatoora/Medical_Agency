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