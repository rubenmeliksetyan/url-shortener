# 🌍 URL Shortener Service

A **URL shortening service** built with **NestJS (backend)** and **React (frontend)**, using **PostgreSQL** for storage
and **Docker** for containerization.

## 🚀 Features

- 🔗 **Shorten URLs** and generate custom slugs
- 👤 **User authentication (Register/Login)**
- 📊 **Track visit statistics for shortened URLs**
- 📝 **Edit and manage shortened URLs**
- 📄 **RESTful API for integration**
- 🐳 **Fully containerized using Docker & PostgreSQL**

---

## 🛠️ Tech Stack

| Technology           | Description                  |
|----------------------|------------------------------|
| **Backend**          | NestJS (TypeORM, PostgreSQL) |
| **Frontend**         | React (Vite)                 |
| **Database**         | PostgreSQL                   |
| **Containerization** | Docker, Docker Compose       |
| **Authentication**   | JWT, bcrypt                  |
| **Reverse Proxy**    | Nginx                        |

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-usdcxername/url-shortener.git
cd url-shortener
```

2️⃣ Configure Environment Variables

Create a .env file inside backend/ and frontend/ with the following:

📝 Backend (backend/.env)

```sh
# General Config
NODE_ENV=development

# Database Config
DATABASE_HOST=postgres_db
DATABASE_PORT=5432
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=url_shortener
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

# JWT Secret
JWT_SECRET=your_super_secret_key
```

📝 Frontend (frontend/.env)

```sh
VITE_API_URL=http://backend_service:3000/api
```

🐳 Running with Docker

Ensure Docker & Docker Compose are installed before proceeding.

1️⃣ Start Services

```sh
docker-compose up --build
```

2️⃣ Access the Application

| Service               | URL                       |
|-----------------------|---------------------------|
| Frontend              | http://localhost:85       |
| Backend API           | http://localhost:3000/api |
| Database (PostgreSQL) | localhost:5432            |

3️⃣ Stop Services

```sh
docker-compose down
```

🔥 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/urls             | Shorten a new URL        |
| GET    | /api/urls/:slug       | Redirect to original URL |
| GET    | /api/urls             | Get all user URLs        |
| PATCH  | /api/urls/:slug       | Edit a shortened URL     |
| GET    | /api/urls/:slug/stats | Get stats for a URL      |
