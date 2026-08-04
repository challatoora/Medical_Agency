#!/bin/bash

chmod +x setup.sh

echo "setuping MYSQL"
sudo dnf install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld
sudo systemctl status mysqld

echo "Setuping nodejs"
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
npm install express mysql2 cors dotenv
npm install --save-dev nodemon

echo "Setup Completed Successfully."

sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
npm install
npm install lucide-react
npm install lucide-react recharts


sudo dnf install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
sudo systemctl status mongod


sudo dnf module enable redis:7 -y
sudo dnf install redis -y
sudo systemctl start redis
sudo systemctl status redis


sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
sudo systemctl status docker
# ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root@123';
# FLUSH PRIVILEGES;
# EXIT;
#d28a12620099e3906dfb4b71893db6a69e4c2167
#eb9dbe3356029f9643250cb4d09a913d3a7918b0
#b77e0fbb9611c770185c317fad168e42ad7212f7