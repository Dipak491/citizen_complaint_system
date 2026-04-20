<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Segoe+UI&weight=800&size=28&pause=1000&color=003580&center=true&vCenter=true&width=650&lines=Citizen+Complaint+Management+System;%E0%A4%A8%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A4%BF%E0%A4%95+%E0%A4%A4%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%B0+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B2%E0%A5%80" alt="Typing SVG" />

<br/>

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🟠  🟠  🟠  ⚪  ⚪  ⚪  ☸  ⚪  ⚪  ⚪  🟢  🟢  🟢
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

# ☸ नागरिक तक्रार प्रणाली
## Citizen Complaint Management System

**महाराष्ट्र शासन | Government of Maharashtra**

MCA Project — Trinity Academy of Engineering, Pune | Smita Pawar

---

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/MUI-v5-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-138808?style=for-the-badge)](LICENSE)

</div>

---

## 📋 विषयसूची / Table of Contents

- [📖 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [⚙️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔐 API Reference](#-api-reference)
- [👤 User Roles](#-user-roles)
- [🗂️ Project Structure](#️-project-structure)
- [🌐 Bilingual Support](#-bilingual-support)
- [🎨 Design System](#-design-system)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)

---

## 📖 Project Overview

The **Citizen Complaint Management System** (नागरिक तक्रार प्रणाली) is a full-stack web portal built to the standards of **NIC / MyGov India** government portals.

It allows citizens of Maharashtra to:
- Lodge civic complaints (Road, Water, Electricity, Sanitation)
- Track complaint status in real-time
- Download and print an official government complaint receipt
- Communicate with government departments digitally

Administrators can manage, filter, prioritise and resolve complaints from a centralised dashboard.

> 🏛️ Designed following **India Government UI/UX Standards** — Saffron + Navy Blue + White palette, Ashoka Chakra branding, bilingual English–Marathi interface.

---

## ✨ Features

### 🧑‍💼 Citizen Portal

| Feature | Description |
|---|---|
| 📋 **My Complaints Dashboard** | View all submitted complaints with live status tracking |
| 🔍 **Smart Search** | Search complaints by title or description instantly |
| 🎛️ **Filters** | Filter by Category (Road / Water / Electricity / Sanitation) and Status |
| 📝 **Submit Complaint** | Bilingual form with category selection and input validation |
| 🔍 **Detail Modal** | Click any complaint to view full details in a popup dialog |
| 🖨️ **Print Receipt** | Generate an official govt-style complaint receipt with reference number |
| 📊 **Stats Overview** | Dashboard cards showing Total / Pending / In Progress / Resolved counts |

### 🛠️ Admin Portal

| Feature | Description |
|---|---|
| 📋 **All Complaints Table** | View every complaint submitted by all citizens |
| 🔄 **Update Status** | Change status: Pending → In Progress → Resolved |
| 🗑️ **Delete Complaint** | Remove invalid or duplicate complaints |
| 🎛️ **Filter & Search** | Filter by status and category simultaneously |
| 📊 **Stats Dashboard** | Real-time count cards for all complaint statuses |
| 🕐 **Timestamps** | Submitted date + "time ago" for every complaint |

### 🔐 Security & Auth

| Feature | Description |
|---|---|
| 🔑 **JWT Authentication** | Secure token-based login for both roles |
| 👥 **Role-Based Access** | Separate CITIZEN and ADMIN roles with protected routes |
| 🔒 **Secure API** | Spring Security with JWT filter applied to all protected endpoints |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       CLIENT (Browser)                        │
│    React 18 + Material UI + React Router DOM v6              │
│                                                              │
│   ┌───────────┐   ┌────────────────┐   ┌─────────────────┐  │
│   │  Login /  │   │   Citizen      │   │  Admin Dashboard │  │
│   │ Register  │   │   Dashboard    │   │ (Manage/Filter)  │  │
│   └───────────┘   └────────────────┘   └─────────────────┘  │
│                                                              │
│              Axios HTTP Client + JWT Bearer Token            │
└──────────────────────────────────────────────────────────────┘
                               │
                               │  REST / HTTP
                               ▼
┌──────────────────────────────────────────────────────────────┐
│              Spring Boot REST API  (Port 8080)               │
│                                                              │
│  ┌───────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ AuthController│  │ComplaintController│  │Spring Security│  │
│  │/auth/login    │  │/complaints (CRUD) │  │+ JWT Filter  │  │
│  │/auth/register │  │                  │  │              │  │
│  └───────────────┘  └──────────────────┘  └──────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Service Layer                             │  │
│  │       UserService  |  ComplaintService                 │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                               │
                               │  JPA / Hibernate
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                       MySQL 8.x Database                      │
│            Tables:   users   |   complaints                  │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2.0 | UI Framework |
| **Material UI (MUI)** | v5 | Component Library (Govt UI standard) |
| **React Router DOM** | 6.22.0 | Client-side routing |
| **Axios** | 1.6.7 | HTTP client for API calls |
| **MUI Icons Material** | v5 | Icon set |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Java** | 17 | Programming language |
| **Spring Boot** | 3.x | REST API Framework |
| **Spring Security** | 6.x | Authentication & Authorization |
| **JWT (jjwt)** | 0.11.5 | JSON Web Token generation & validation |
| **Spring Data JPA** | — | ORM / Database abstraction |
| **Hibernate** | — | JPA Implementation |
| **MySQL** | 8.x | Production Database |
| **Maven** | 3.x | Build & dependency tool |

### Design System

| Element | Value |
|---|---|
| **Primary Color** | `#003580` India Govt Navy Blue |
| **Accent Color** | `#FF9933` Saffron |
| **Success Color** | `#138808` India Green |
| **Font** | Segoe UI / Roboto |
| **Style Guide** | NIC / MyGov India standard |
| **Language** | English + मराठी (Bilingual) |

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed:

```
✅  Java 17+         → https://adoptium.net/
✅  Maven 3.8+       → https://maven.apache.org/
✅  MySQL 8.x        → https://dev.mysql.com/downloads/
✅  Node.js 18+      → https://nodejs.org/
✅  npm 9+           → Bundled with Node.js
✅  Git              → https://git-scm.com/
```

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Dipak491/citizen_complaint_system.git
cd citizen_complaint_system
```

---

### Step 2 — Setup MySQL Database

Open MySQL Workbench or terminal and run:

```sql
CREATE DATABASE complaint_db;
```

---

### Step 3 — Configure the Backend

Open `backend/src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/complaint_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### Step 4 — Run the Backend

```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

> ✅ Backend starts on **http://localhost:8080**
>
> 📚 Swagger UI available at **http://localhost:8080/swagger-ui/index.html**

---

### Step 5 — Run the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

> ✅ Frontend starts on **http://localhost:3000**

---

### Step 6 — Test Accounts

Register via the app's `/register` page, or use pre-seeded accounts:

| Role | Email | Password |
|---|---|---|
| **CITIZEN** | citizen@test.com | test123 |
| **ADMIN** | admin@test.com | admin123 |

---

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend JAR
cd backend
mvn clean package
java -jar target/complaint-system-0.0.1-SNAPSHOT.jar
```

---

## 🔐 API Reference

> **Base URL:** `http://localhost:8080`
>
> 🔒 Protected endpoints require the header:
> `Authorization: Bearer <your_jwt_token>`

### Auth Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ Public |
| `POST` | `/auth/login` | Login and receive JWT token | ❌ Public |

#### Register — Request Body
```json
{
  "name": "Dipak Narkhede",
  "email": "dipak@example.com",
  "password": "password123",
  "role": "CITIZEN"
}
```

#### Login — Request Body
```json
{
  "email": "dipak@example.com",
  "password": "password123"
}
```

#### Login — Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "Dipak Narkhede",
  "role": "CITIZEN"
}
```

---

### Complaint Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/complaints` | Submit a new complaint | 🔒 CITIZEN |
| `GET` | `/complaints/my` | Get my complaints | 🔒 CITIZEN |
| `GET` | `/complaints/all` | Get all complaints | 🔒 ADMIN |
| `GET` | `/complaints/{id}` | Get single complaint | 🔒 ADMIN |
| `PUT` | `/complaints/{id}/status` | Update complaint status | 🔒 ADMIN |
| `DELETE` | `/complaints/{id}` | Delete a complaint | 🔒 ADMIN |

#### Submit Complaint — Request Body
```json
{
  "title": "Large pothole on main road",
  "description": "There is a large pothole near the market that causes accidents.",
  "category": "ROAD"
}
```

#### Complaint — Response
```json
{
  "id": 1,
  "title": "Large pothole on main road",
  "description": "There is a large pothole near the market...",
  "category": "ROAD",
  "status": "PENDING",
  "citizenName": "Dipak Narkhede",
  "citizenEmail": "dipak@example.com",
  "createdAt": "2026-04-20T10:30:00",
  "updatedAt": "2026-04-20T10:30:00"
}
```

#### Available Values

```
Categories  →  ROAD | WATER | ELECTRICITY | SANITATION
Statuses    →  PENDING | IN_PROGRESS | RESOLVED
Roles       →  CITIZEN | ADMIN
```

---

## 👤 User Roles

### 🧑‍💼 CITIZEN

```
1.  Register or Login to the portal
2.  Submit civic complaints with title, description, category
3.  View all personal complaints on the dashboard
4.  Search complaints by keyword (title / description)
5.  Filter complaints by Category and/or Status
6.  Click on a complaint → view full details in a popup modal
7.  Print an official government receipt (with Ref No & tricolor header)
8.  Track status changes: Pending → In Progress → Resolved
```

### 🛠️ ADMIN

```
1.  Login with admin credentials
2.  View all complaints from every citizen in a table
3.  Filter by status and/or category simultaneously
4.  Update complaint status (dropdown on each row)
5.  Delete invalid or spam complaints
6.  View citizen name and email for each complaint
7.  See submitted timestamps + relative "time ago" display
```

---

## 🗂️ Project Structure

```
citizen_complaint_system/
│
├── 📁 frontend/                           React Application
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.js                  Top navigation bar (MUI AppBar)
│   │   │   └── AshokaChakra.js            Ashoka Chakra SVG component
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Login.js                   Login page
│   │   │   ├── Register.js                Citizen registration page
│   │   │   ├── CitizenDashboard.js        Citizen portal (search, filter, modal, print)
│   │   │   └── AdminDashboard.js          Admin management panel
│   │   │
│   │   ├── 📁 context/
│   │   │   └── AuthContext.js             Auth state + JWT management
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js                     Axios instance + API calls
│   │   │
│   │   ├── 📁 theme/
│   │   │   └── govTheme.js                MUI custom government colour theme
│   │   │
│   │   ├── 📁 utils/
│   │   │   └── dateUtils.js               formatDate + timeAgo helpers
│   │   │
│   │   ├── App.js                         Root router + MUI ThemeProvider
│   │   ├── index.js                       React DOM entry point
│   │   └── index.css                      Global CSS + print styles
│   │
│   └── package.json
│
├── 📁 backend/                            Spring Boot Application
│   └── src/main/java/com/citizen/complaint/
│       ├── 📁 config/
│       │   ├── SecurityConfig.java         Spring Security + CORS configuration
│       │   └── SwaggerConfig.java          Swagger / OpenAPI docs setup
│       │
│       ├── 📁 controller/
│       │   ├── AuthController.java         POST /auth/register, /auth/login
│       │   └── ComplaintController.java    GET/POST/PUT/DELETE /complaints
│       │
│       ├── 📁 dto/
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── ComplaintRequest.java
│       │   └── ComplaintResponse.java
│       │
│       ├── 📁 entity/
│       │   ├── User.java                   User entity (name, email, role)
│       │   ├── Complaint.java              Complaint entity
│       │   ├── Role.java                   Enum: CITIZEN | ADMIN
│       │   └── Category.java               Enum: ROAD | WATER | ELECTRICITY | SANITATION
│       │
│       ├── 📁 repository/
│       │   ├── UserRepository.java
│       │   └── ComplaintRepository.java
│       │
│       ├── 📁 security/
│       │   ├── JwtUtil.java                Token generation & validation
│       │   └── JwtFilter.java              Per-request JWT authentication filter
│       │
│       ├── 📁 service/
│       │   ├── UserService.java
│       │   └── ComplaintService.java
│       │
│       └── 📁 exception/
│           └── GlobalExceptionHandler.java  Centralised error handling
│
├── USER_MANUAL.md                          Full user manual (English + Marathi)
└── README.md                               This file
```

---

## 🌐 Bilingual Support

All UI text is displayed in both **English** and **मराठी (Marathi)**, matching Indian government portal standards:

| English | मराठी |
|---|---|
| Welcome | नमस्कार |
| My Complaints | माझ्या तक्रारी |
| Submit Complaint | तक्रार सादर करा |
| New Complaint | नवीन तक्रार |
| Search complaints... | तक्रार शोधा... |
| Category | श्रेणी |
| Status | स्थिती |
| Pending | प्रलंबित |
| In Progress | प्रगतीपथावर |
| Resolved | निराकरण |
| Complaint ID | तक्रार क्र. |
| Description | वर्णन |
| Submitted | सादर केले |
| Last Updated | शेवटचे अद्यतन |
| Print Receipt | पावती प्रिंट करा |
| Close | बंद करा |
| Cancel | रद्द करा |
| All | सर्व |

---

## 🎨 Design System

### Colour Palette

```
  ████  #FF9933  — Saffron       (Buttons, accents, banner border)
  ████  #003580  — Navy Blue     (Header, primary actions, modal title)
  ████  #138808  — India Green   (Resolved status, success)
  ████  #FFFFFF  — White         (Background, cards)
  ████  #F57F17  — Amber         (Pending status)
  ████  #0277BD  — Sky Blue      (In Progress status)
  ████  #E53935  — Red           (Road category, danger actions)
```

### Status Colour Coding

| Status | Chip Colour | Background |
|---|---|---|
| 🟡 PENDING | `#F57F17` Amber | `#FFF8E1` |
| 🔵 IN_PROGRESS | `#0277BD` Blue | `#E1F5FE` |
| 🟢 RESOLVED | `#2E7D32` Green | `#E8F5E9` |

### Category Colour Coding

| Category | Icon | Colour |
|---|---|---|
| 🔴 ROAD | ConstructionIcon | `#E53935` |
| 🔵 WATER | WaterDropIcon | `#1565C0` |
| 🟡 ELECTRICITY | BoltIcon | `#F57F17` |
| 🟢 SANITATION | DeleteSweepIcon | `#2E7D32` |

---

## 📱 Responsive Design

The portal is fully responsive across all screen sizes:

| Device | Breakpoint | Layout |
|---|---|---|
| 📱 Mobile | < 600px | Single column, stacked cards, full-width filters |
| 📟 Tablet | 600–960px | 2-column stats, compact search bar |
| 🖥️ Desktop | > 960px | Full 4-column stats layout |
| 🖨️ Print | — | Clean A4 receipt layout with tricolor header |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository on GitHub

# 2. Create your feature branch
git checkout -b feature/my-new-feature

# 3. Make your changes and commit
git commit -m "feat: add my new feature"

# 4. Push to your branch
git push origin feature/my-new-feature

# 5. Open a Pull Request on GitHub
```

Please follow the existing code style and include bilingual labels for any new UI text.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🟠  🟠  🟠  ⚪  ⚪  ⚪  ☸  ⚪  ⚪  ⚪  🟢  🟢  🟢
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**नागरिक तक्रार प्रणाली | Citizen Complaint Management System**

© 2026 महाराष्ट्र शासन | Government of Maharashtra &nbsp;·&nbsp; सर्व हक्क राखीव | All Rights Reserved

Helpline: **1800-XXX-XXXX** &nbsp;|&nbsp; support@maharashtra.gov.in

Made with ❤️ by **[Dipak Narkhede](https://github.com/Dipak491)**

</div>
