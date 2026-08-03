#!/bin/bash

echo "Creating Inventory Redis Structure..."

redis-cli HSET inventory _schema \
'{
"medicine_id":"",
"supplier_id":"",
"batch_number":"",
"quantity":0,
"purchase_price":0,
"selling_price":0,
"expiry_date":"",
"stock_status":""
}'

echo "Inventory Redis structure created successfully"