#!/bin/bash

chmod +x setup.sh

echo "setuping MYSQL"
sudo dnf install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld
sudo systemctl status mysqld


# ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root@123';
# FLUSH PRIVILEGES;
# EXIT;