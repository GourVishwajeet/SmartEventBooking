# 🎟️ Smart Event Booking System

A full-stack event booking system with real-time seat updates.

---

## 🚀 Features
- Event creation & management (Admin)
- Ticket booking with QR code confirmation
- Real-time seat updates using Socket.IO
- Animated checkout flow with success screen

---

## ⚙️ Setup

### 1. Clone Repo
```bash
git clone https://github.com/your-username/event-booking.git
cd event-booking


Backend Setup
cd backend
npm install


Create a .env file:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=event_booking


Run migrations:

mysql -u root -p < event_booking.sql


Start backend:

npm run dev

rontend Setup
cd frontend
npm install
npm run dev


Frontend will be at http://localhost:5173 (Vite).
