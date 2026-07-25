-- Run this once to set up the database
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- The `products` table is auto-created by Hibernate (spring.jpa.hibernate.ddl-auto=update)
-- This file seeds some sample data for testing

INSERT INTO products (name, description, category, price, quantity, low_stock_threshold, created_at, updated_at)
VALUES
  ('Wireless Mouse',       'Ergonomic 2.4GHz wireless mouse',      'Electronics',   799.00,  50, 10, NOW(), NOW()),
  ('Mechanical Keyboard',  'RGB backlit mechanical keyboard',       'Electronics',  2499.00,   8, 10, NOW(), NOW()),
  ('USB-C Hub',            '7-in-1 multiport USB-C adapter',        'Electronics',  1299.00,  25, 10, NOW(), NOW()),
  ('Notebook (A5)',        '200-page spiral-bound notebook',        'Stationery',    149.00, 100, 20, NOW(), NOW()),
  ('Ballpoint Pens (10pk)','Smooth writing ballpoint pens pack',   'Stationery',     99.00,   5, 15, NOW(), NOW()),
  ('Office Chair',         'Adjustable ergonomic office chair',    'Furniture',    8999.00,   3, 5,  NOW(), NOW()),
  ('Standing Desk Mat',    'Anti-fatigue standing desk mat',       'Furniture',    1499.00,  12, 5,  NOW(), NOW()),
  ('Webcam HD 1080p',      'Full HD USB webcam with mic',          'Electronics',  2199.00,   0, 10, NOW(), NOW());
