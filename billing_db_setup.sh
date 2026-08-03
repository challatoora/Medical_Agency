#!/bin/bash

echo "Creating Billing Database..."

mysql -u root -p <<EOF

CREATE DATABASE IF NOT EXISTS billing_db;

USE billing_db;


CREATE TABLE IF NOT EXISTS invoices (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    user_id INT NOT NULL,

    invoice_number VARCHAR(100) NOT NULL UNIQUE,

    subtotal DECIMAL(10,2) NOT NULL,

    tax_amount DECIMAL(10,2) NOT NULL,

    discount_amount DECIMAL(10,2) DEFAULT 0,

    total_amount DECIMAL(10,2) NOT NULL,

    payment_status VARCHAR(50) DEFAULT 'Pending',

    payment_method VARCHAR(50) DEFAULT 'Cash',

    invoice_status VARCHAR(50) DEFAULT 'Generated',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);


EOF


echo "Billing Database Setup Completed"