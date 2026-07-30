#!/bin/bash

BASE_DIR="$HOME/Medical_Agency/Backend"

echo "========================================"
echo " Starting Medical Agency Backend"
echo "========================================"

start_service() {
    SERVICE_NAME=$1
    SERVICE_DIR=$2

    echo ""
    echo "Starting $SERVICE_NAME..."

    cd "$BASE_DIR/$SERVICE_DIR" || exit 1

    nohup npm start > "$BASE_DIR/$SERVICE_DIR/service.log" 2>&1 &

    echo "$SERVICE_NAME started with PID $!"
}

start_service "User Service" "user-service"

start_service "Medicine Service" "medicine-service"

start_service "Inventory Service" "inventory-service"

start_service "Supplier Service" "supplier-service"

start_service "Order Service" "order-service"

start_service "Billing Service" "billing-service"

echo ""
echo "========================================"
echo " All 6 services started"
echo "========================================"

sleep 3

echo ""
echo "===== RUNNING NODE PROCESSES ====="

ps aux | grep '[n]ode'

echo ""
echo "===== LISTENING PORTS ====="

sudo ss -tulpn | grep node