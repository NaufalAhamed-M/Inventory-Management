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
# 🗄️ Inventory Management System

A full-stack web application to manage product inventory efficiently. The application allows users to add, update, delete, and search products, monitor stock levels, and receive low-stock alerts through a clean and responsive dashboard.

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Database
- MySQL

---

## ✨ Features

- 📊 **Dashboard** — View total products, inventory value, low-stock count, and out-of-stock count.
- 📦 **Product CRUD** — Add, update, delete, and manage products with validation.
- 🔍 **Search & Filter** — Search products by name and filter by category.
- ⚠️ **Low Stock Alerts** — Get notified when product quantity falls below a custom threshold.
- 🏷️ **Stock Status Badges** — Display **In Stock**, **Low Stock**, and **Out of Stock** indicators.

---

## 📁 Project Structure

```
inventory-management/
│
├── backend/                 # Spring Boot REST API
│
├── frontend/                # React Application
│
└── database/
    └── init.sql             # Sample SQL (Optional)
```

---

## ⚙️ Prerequisites

Make sure the following software is installed:

- Java JDK 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+
- npm

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management.git
cd inventory-management
```

---

### 2️⃣ Create the Database

Open MySQL and run:

```sql
CREATE DATABASE inventory_db;
```

---

### 3️⃣ Configure Database

Open:

```
backend/src/main/resources/application.properties
```

Update your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db

spring.datasource.username=root

spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### 4️⃣ Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 5️⃣ Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📌 Notes

- Run both **Backend** and **Frontend** simultaneously.
- The application automatically creates the required database tables using Hibernate.
- No manual SQL scripts are required unless you want to import sample data.
- Make sure MySQL is running before starting the backend.

---

## 📷 Screenshots

> Add screenshots of your application here.

- Dashboard
- Product List
- Add Product
- Edit Product
- Low Stock Alerts

---

## 🎯 Future Enhancements

- 🔐 Spring Security + JWT Authentication
- 👥 Role-Based Access Control (Admin/User)
- 📄 Export Products to Excel/PDF
- 📈 Inventory Analytics & Charts
- 📦 Barcode/QR Code Support
- 🔔 Email Notifications for Low Stock
- ☁️ Docker Deployment
- 🚀 CI/CD with GitHub Actions

---

# 📌 Notes

-Both backend and frontend must be running at the same time
-Backend runs on port 8080, Frontend on port 3000
-The products table is created automatically — no manual SQL needed
