#!/bin/bash

echo "Starting Database Setup..."

./user_db_setup.sh
./order_db_setup.sh
./billing_db_setup.sh
./medicine_db_setup.sh
./supplier_db_setup.sh

echo "All Databases Created Successfully"