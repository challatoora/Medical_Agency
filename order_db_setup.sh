#!/bin/bash

echo "Creating Order Database..."

mysql -u root -p <<EOF

CREATE DATABASE IF NOT EXISTS order_db;

USE order_db;


CREATE TABLE IF NOT EXISTS orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    customer_name VARCHAR(100) NOT NULL,

    medicine_name VARCHAR(150) NOT NULL,

    quantity INT NOT NULL,

    total_price DECIMAL(10,2) NOT NULL,

    status VARCHAR(50) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);


EOF


echo "Order Database Setup Completed"