#!/bin/bash

chmod +x setup.sh

echo "setuping MYSQL"
sudo dnf install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld
sudo systemctl status mysqld

echo "Setupimh nodejs"
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
npm install express mysql2 cors dotenv
npm install --save-dev nodemon

echo "Setup Completed Successfully."
# ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root@123';
# FLUSH PRIVILEGES;
# EXIT;