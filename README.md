# 📦 Parcel Delivery Frontend (React + Redux Toolkit + RTK Query)

## 📖 Project Overview

This project is a **Parcel Delivery Frontend Application** built using **React.js**, **Redux Toolkit**, and **RTK Query**.  

The system is inspired by real-world courier services like **Pathao Courier** or **Sundarban Courier**, and it provides a **secure, role-based, and responsive dashboard** for three main user types:  

- **Sender** → can create and manage parcel requests  
- **Receiver** → can confirm and view parcel deliveries  
- **Admin** → can manage users, parcels, and oversee the entire system  

The application consumes a **REST API backend** and focuses on **authentication, role-based access, state management, and parcel tracking**.  

---

## 🛠 Tech Stack

### Frontend
- React.js + Vite  
- React Router  
- Redux Toolkit (State Management)  
- RTK Query (API Calls)  
- TypeScript  
- Tailwind CSS (Styling)  

### Backend (Consumed API)
- Node.js + Express  
- MongoDB + Mongoose  
- JWT + bcrypt  

---

## ✅ Minimum Functional Requirements

### 1️⃣ Public Landing Section
- **Home Page** – Landing page introducing the parcel delivery service  
- **About Page** – Service description, mission, and team info  
- **Contact Page** – Inquiry form (simulated submission)  

---

### 2️⃣ Authentication
- Login & Registration with JWT authentication  
- Role-based redirection (**Sender/Receiver/Admin**)  
- Persisted authentication (remains logged in after refresh)  
- Logout  

---

### 3️⃣ Sender Dashboard
- Create parcel delivery requests  
- Cancel parcel (if not dispatched)  
- View all created parcels & statuses  

---

### 4️⃣ Receiver Dashboard
- View incoming parcels  
- Confirm delivery  
- View delivery history  

---

### 5️⃣ Admin Dashboard
- Manage users (block/unblock)  
- Manage parcels (block/unblock, update status)  
- Assign delivery personnel (optional)  

---

### 6️⃣ Parcel Tracking
- Unique tracking ID for each parcel  
- Public or authenticated search by tracking ID  
- Status logs (status, timestamp, updatedBy, notes)  

---

### 7️⃣ General Features
- Role-based navigation  
- Loading indicators & global error handling  
- Form validations (required fields, numeric checks, etc.)  
- Advanced filtering & pagination  
- Toast notifications (success/error)  
- **Dashboard Visuals:**  
  - Overview Cards (Total, Delivered, In Transit, Pending/Cancelled)  
  - Charts (bar/pie for trends & distribution)  
  - Parcel Table (searchable, paginated, filterable)  
  - Status Timeline (visual update history)  
- Responsive design (mobile-friendly, clean typography, accessible colors)  

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/parcel-delivery-frontend.git
   cd parcel-delivery-frontend
