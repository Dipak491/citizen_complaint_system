# Citizen Complaint & Issue Tracking System
### MCA Project — Trinity Academy of Engineering, Pune | Smita Pawar

---

## Prerequisites
- Java 17
- Maven (or use ./mvnw)
- MySQL 8.x
- Node.js 18+

---

## Step 1 — Setup MySQL Database

Open MySQL Workbench or terminal and run:
```sql
CREATE DATABASE complaint_db;
```

---

## Step 2 — Configure Backend

Open: `backend/src/main/resources/application.properties`

Update your MySQL credentials:
```
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## Step 3 — Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs at: http://localhost:8080
Swagger UI at:   http://localhost:8080/swagger-ui/index.html

---

## Step 4 — Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: http://localhost:3000

---

## Test Accounts (Register via app or Swagger)

| Role    | Email                  | Password  |
|---------|------------------------|-----------|
| CITIZEN | citizen@test.com       | test123   |
| ADMIN   | admin@test.com         | admin123  |

---

## API Endpoints

| Endpoint                      | Method | Access  |
|-------------------------------|--------|---------|
| POST /auth/register           | POST   | Public  |
| POST /auth/login              | POST   | Public  |
| POST /complaints              | POST   | CITIZEN |
| GET  /complaints/my           | GET    | CITIZEN |
| GET  /complaints/all          | GET    | ADMIN   |
| GET  /complaints/{id}         | GET    | ADMIN   |
| PUT  /complaints/{id}/status  | PUT    | ADMIN   |
| DELETE /complaints/{id}       | DELETE | ADMIN   |

---

## Project Structure

```
backend/
  src/main/java/com/citizen/complaint/
    config/         SecurityConfig, SwaggerConfig
    controller/     AuthController, ComplaintController
    dto/            LoginRequest, RegisterRequest, ComplaintRequest, ComplaintResponse
    entity/         User, Complaint, Role, Category
    exception/      GlobalExceptionHandler
    repository/     UserRepository, ComplaintRepository
    security/       JwtUtil, JwtFilter
    service/        UserService, ComplaintService

frontend/
  src/
    context/        AuthContext.js
    services/       api.js
    components/     Navbar.js
    pages/          Login.js, Register.js, CitizenDashboard.js, AdminDashboard.js
    App.js
```
