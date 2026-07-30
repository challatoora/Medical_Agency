USE user_db;

INSERT INTO users
(name, email, password, phone, role)
VALUES
(
    'Admin User',
    'admin@medicalagency.com',
    'admin123',
    '9999999999',
    'admin'
)
ON DUPLICATE KEY UPDATE email = email;


USE order_db;

INSERT INTO orders
(user_id, total_amount, status)
VALUES
(
    1,
    500.00,
    'PENDING'
);


USE billing_db;

INSERT INTO invoices
(order_id, user_id, amount, status)
VALUES
(
    1,
    1,
    500.00,
    'PENDING'
);