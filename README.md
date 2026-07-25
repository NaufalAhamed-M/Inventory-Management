# 🗄️ Inventory-Management

A full-stack web application to manage product inventory — add, update, delete, search products, track stock levels, and monitor low-stock alerts through a clean dashboard.

Built with Java Spring Boot, MySQL, and React.

# ✨ Features

--📊 Dashboard — Total products, inventory value, low stock & out-of-stock count
--📦 Product CRUD — Add, edit, delete products with validation
--🔍 Search & Filter — Search by name, filter by category
--⚠️ Low Stock Alerts — Per-product threshold with a dedicated alert page
--🏷️ Stock Badges — In Stock / Low Stock / Out of Stock indicators

# 📁 Project Structure

inventory-management/
├── backend/                  → Spring Boot REST API 
├── frontend/                 → React UI 
└── database/
    └── init.sql              → Sample seed data

# ⚙️ Prerequisites

Make sure these are installed before running the project:

Java JDK 17+
Maven 3.8+
MySQL 8+
Node.js 18+

# 🚀 How to Run

1. Clone the Repository
    git clone https://github.com/your-username/inventory-management.git
    cd inventory-management
   
2. Set Up the Database
Open MySQL and run:
    CREATE DATABASE inventory_db;
   
3. Configure Database Password
Open backend/src/main/resources/application.properties and update:
  properties
  spring.datasource.password=YOUR_MYSQL_PASSWORD
  
4. Run the Backend
Open a terminal inside the backend/ folder:
    -cd backend
    -mvn spring-boot:run

5. Run the Frontend
Open a new terminal inside the frontend/ folder:

  -cd frontend
  -npm install
  -npm start

# 📌 Notes

-Both backend and frontend must be running at the same time
-Backend runs on port 8080, Frontend on port 3000
-The products table is created automatically — no manual SQL needed
