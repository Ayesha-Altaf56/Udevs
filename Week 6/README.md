# E-Shop - Modern React E-commerce Application

## 🛒 Overview
E-Shop is a fully responsive, modern e-commerce web application built using **React.js**. It features a clean user interface inspired by premium shopping platforms, a functional shopping cart, product listings, detailed product views, and a comprehensive admin dashboard for management.

The project focuses on **reusable component-based architecture**, efficient state management using React hooks, and professional styling with Bootstrap.

## 🚀 Technologies Used
- **Frontend Framework:** React.js (via Vite)
- **Routing:** React Router DOM (v6+)
- **Styling:** Vanilla CSS (App.css) & Bootstrap 5
- **Icons:** FontAwesome 6
- **State Management:** React `useState` & `useOutletContext`

## 📁 Project Structure
```text
/src
  ├── components/        # Reusable UI Components
  │   ├── Navbar.jsx     # Navigation bar with dynamic cart count
  │   ├── Sidenav.jsx    # Mobile/Category sidebar menu
  │   ├── Footer.jsx     # Global footer
  │   ├── ProductCard.jsx# Standardized product display
  │   ├── CartItem.jsx   # Individual cart item layout
  │   ├── Sidebar.jsx    # Admin dashboard navigation
  │   ├── DashboardCard.jsx # Admin stats card
  │   └── TableRow.jsx   # Admin table row component
  ├── pages/             # Page Components
  │   ├── Home.jsx       # Landing page with featured products
  │   ├── Products.jsx   # Product listing with filters
  │   ├── ProductDetails.jsx # Detailed view of a single product
  │   ├── Cart.jsx       # Shopping cart management
  │   ├── Login.jsx      # User authentication (Login/Signup)
  │   └── AdminDashboard.jsx # Management dashboard
  ├── App.jsx            # Main app logic, routing, and cart state
  ├── App.css            # Custom CSS and Bootstrap overrides
  └── main.jsx           # Application entry point
```

## ✨ Features
### 1. Reusable Component Architecture
The UI is broken down into small, modular components like `ProductCard` and `CartItem`. This allows for multi-purpose views (e.g., using `compact` props for different page layouts).

### 2. Dynamic Cart Logic
State is managed in `App.jsx` and provided to all sub-pages via React Router's `useOutletContext`.
- **Add to Cart:** Real-time updates to the cart count badge in the Navbar.
- **Cart Management:** Increase/decrease quantities or remove items directly from the cart page.
- **Subtotal Calculation:** Automatic calculation of prices and quantities.

### 3. Professional Admin Dashboard
A dedicated admin section featuring:
- **Stats Overview:** Quick look at sales, orders, users, and requests.
- **Order Tracking:** A responsive table displaying recent orders with status badges.

### 4. Fully Responsive Design
Optimized for mobile, tablet, and desktop views using custom CSS and Bootstrap's grid system.

## 🛠️ How to Run Locally

1. **Clone the repository** (if applicable).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📊 Data Usage
The application currently uses **dynamic dummy data** to simulate a real-world environment. Products, stats, and orders are managed via React state, allowing for immediate interaction without needing a backend.

---
*Created for Udevs Week 5 Task.*
