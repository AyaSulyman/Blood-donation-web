# 🩸 Blood Donation Platform

A full-stack blood donation platform designed to connect **blood donors, patients, and donation centers** through a simple and user-friendly web application.

The platform allows users to register and authenticate, manage donor information, search for available donors, view donor details, manage blood donations, and discover donation centers.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Email verification
* Secure authentication
* User profile management

### 🩸 Donor Management

* Browse available blood donors
* Search and filter donors
* View donor details
* Display blood type and donor information
* Track donation history

### 🏥 Donation Centers

* Browse blood donation centers
* View center information
* Find available donation locations

### 💉 Blood Donations

* Create blood donation records
* Retrieve donation history
* View individual donation details

### 📱 Responsive Interface

* Modern Vue.js interface
* Responsive design
* Reusable components
* Client-side routing

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose                  |
| ---------- | ------------------------ |
| Vue 3      | User interface           |
| TypeScript | Type safety              |
| Vite       | Development & build tool |
| Vue Router | Application routing      |
| Pinia      | State management         |
| Axios      | API communication        |

### Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | Runtime            |
| Fastify    | Backend framework  |
| TypeScript | Type safety        |
| MongoDB    | Database           |
| Zod        | Request validation |

---

## 📁 Project Structure

```text
blood-donation/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── router/
│   │   ├── types/
│   │   └── App.vue
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── models/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB
* Git

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blood-donation
```

---

# 🖥️ Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
.env
```

Example:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
.env
```

Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blood-donation
JWT_SECRET=your-secret-key
```

Start the development server:

```bash
npm run dev
```

The API will normally be available at:

```text
http://localhost:3000
```

---

# 🔗 API Overview

The backend provides REST APIs for the main platform features.

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
```

### Donors

```text
GET /api/donors
GET /api/donors/:id
```

### Blood Donations

```text
GET  /api/v1/donations
POST /api/v1/donations
GET  /api/v1/donations/:id
```

### Donation Centers

```text
GET /api/centers
```

> Exact endpoints may vary depending on the currently configured Fastify route prefixes.

---

# 🔄 Application Flow

```text
User
 │
 ├── Register
 │
 ├── Login
 │
 ├── Browse Donors
 │      │
 │      └── View Donor Details
 │
 ├── Search Donors
 │
 ├── View Donation Centers
 │
 └── Manage Blood Donations
          │
          ├── Create Donation
          └── View Donation History
```

---

# 🧪 Development

Run the frontend:

```bash
cd frontend
npm run dev
```

Run the backend:

```bash
cd backend
npm run dev
```

Build the frontend:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🔐 Environment Variables

Do **not** commit your `.env` files to GitHub.

Make sure `.gitignore` contains:

```text
.env
.env.local
node_modules/
dist/
```

Use environment variables for sensitive configuration such as:

* Database connection strings
* JWT secrets
* API URLs
* Authentication credentials

---

# 🎯 Project Goals

The main goal of this platform is to make blood donation easier and more accessible by providing a centralized system where users can:

* Find suitable blood donors
* Search based on blood type and location
* Manage donation information
* Find nearby donation centers
* Maintain donation history
* Connect people who need blood with potential donors

---

# 🔮 Future Improvements

Planned improvements can include:

* 📍 Location-based donor search
* 🔔 Real-time donation notifications
* 📱 Mobile application
* 🗺️ Interactive donation center maps
* 💬 Donor/request communication
* 📊 Donation statistics and dashboards
* 🏆 Donor achievements and rewards
* 🔐 Advanced role-based access control
* 📧 Email and SMS notifications

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 👩‍💻 Author

**Aya Sulyman**

Built with ❤️ using **Vue.js, TypeScript, Fastify, and MongoDB**.

---

## 📄 License

This project is for educational and development purposes.
