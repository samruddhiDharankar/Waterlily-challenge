# 📝 Survey App

A full-stack survey application that collects user details, health information, and financial data using a React frontend and an Express backend with Prisma ORM and a Sqlite3 database.

---

## 🚀 Features

- User personal information form (name, age, gender, etc.)
- Health details form (chronic conditions, insurance)
- Finance form (income, savings, debt)
- Form data stored in a PostgreSQL database using Prisma
- Clean, modular React components with TailwindCSS
- Built with Vite for fast development

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: Sqlite3 with Prisma ORM

---

## API Endpoints
👤 User Details
- GET /api/users?email=<user_email> - Fetch a user by email
- POST /api/users – Create a new user

❤️ Health Details
- GET /api/user-health?email=<user_email> – Fetch user’s health details
- POST /api/user-health – Submit health details

💰 Finance Details
- GET /api/user-finance?email=<user_email> – Fetch user’s financial info
- POST /api/user-finance – Submit finance details

---

## Some Improvements
- Add authentication using JWT
- Add prev and next buttons for better navigation
- Add signup/login feature
- Add edit feature to edit user details
