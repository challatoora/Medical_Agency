#!/bin/bash

chmod +x setup-database.sh
set -e

echo "=========================================="
echo " MEDICAL AGENCY DATABASE AUTOMATION"
echo "=========================================="

# ==========================================
# MYSQL
# ==========================================

echo ""
echo "===== MYSQL SETUP ====="

if ! command -v mysql >/dev/null 2>&1; then
    echo "ERROR: MySQL is not installed."
    exit 1
fi

if ! sudo systemctl is-active --quiet mysqld; then
    echo "MySQL is not running."
    echo "Starting MySQL..."
    sudo systemctl start mysqld
fi

echo "MySQL is running."

echo ""
echo "Enter MySQL root password:"
read -s MYSQL_PASSWORD

echo ""
echo "Creating MySQL databases..."

mysql -u root -p"$MYSQL_PASSWORD" \
    < database/mysql/01-create-databases.sql

echo "MySQL databases created."

echo ""
echo "Creating MySQL tables..."

mysql -u root -p"$MYSQL_PASSWORD" \
    < database/mysql/02-create-tables.sql

echo "MySQL tables created."

echo ""
echo "Inserting MySQL sample data..."

mysql -u root -p"$MYSQL_PASSWORD" \
    < database/mysql/03-seed-data.sql

echo "MySQL sample data inserted."


# ==========================================
# MONGODB
# ==========================================

echo ""
echo "===== MONGODB SETUP ====="

if ! command -v mongosh >/dev/null 2>&1; then
    echo "ERROR: mongosh is not installed."
    exit 1
fi

if ! sudo systemctl is-active --quiet mongod; then
    echo "MongoDB is not running."
    echo "Starting MongoDB..."
    sudo systemctl start mongod
fi

echo "MongoDB is running."

echo ""
echo "Initializing MongoDB databases and collections..."

mongosh < database/mongodb/init.js

echo "MongoDB initialization completed."


# ==========================================
# REDIS
# ==========================================

echo ""
echo "===== REDIS SETUP ====="

if ! command -v redis-cli >/dev/null 2>&1; then
    echo "ERROR: Redis is not installed."
    exit 1
fi

if ! sudo systemctl is-active --quiet redis; then
    echo "Redis is not running."
    echo "Starting Redis..."
    sudo systemctl start redis
fi

if [ "$(redis-cli ping)" = "PONG" ]; then
    echo "Redis is running successfully."
else
    echo "ERROR: Redis connection failed."
    exit 1
fi


# ==========================================
# FINAL VERIFICATION
# ==========================================

echo ""
echo "=========================================="
echo " DATABASE VERIFICATION"
echo "=========================================="

echo ""
echo "===== MYSQL DATABASES ====="

mysql -u root -p"$MYSQL_PASSWORD" -e "
SHOW DATABASES;
"

echo ""
echo "===== USER TABLES ====="

mysql -u root -p"$MYSQL_PASSWORD" -e "
USE user_db;
SHOW TABLES;
"

echo ""
echo "===== ORDER TABLES ====="

mysql -u root -p"$MYSQL_PASSWORD" -e "
USE order_db;
SHOW TABLES;
"

echo ""
echo "===== BILLING TABLES ====="

mysql -u root -p"$MYSQL_PASSWORD" -e "
USE billing_db;
SHOW TABLES;
"

echo ""
echo "===== MONGODB DATABASES ====="

mongosh --quiet --eval "
db.adminCommand({ listDatabases: 1 }).databases.forEach(function(database) {
    print(database.name);
});
"

echo ""
echo "===== REDIS ====="

redis-cli ping

echo ""
echo "=========================================="
echo " DATABASE SETUP COMPLETED SUCCESSFULLY"
echo "=========================================="