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

npm install lucide-react
npm install lucide-react recharts
# ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root@123';
# FLUSH PRIVILEGES;
# EXIT;
#d28a12620099e3906dfb4b71893db6a69e4c2167

# login
#app.jsx
#sidebar
#eb9dbe3356029f9643250cb4d09a913d3a7918b0