# नागरिक तक्रार प्रणाली — User Manual
## Citizen Complaint Management System
### महाराष्ट्र शासन | Government of Maharashtra

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Getting Started — Running the Application](#2-getting-started)
3. [Citizen Guide](#3-citizen-guide)
   - 3.1 Register a New Account
   - 3.2 Login
   - 3.3 Dashboard Overview
   - 3.4 Submit a New Complaint
   - 3.5 View & Search Complaints
   - 3.6 View Complaint Details
   - 3.7 Print Complaint Receipt
   - 3.8 Logout
4. [Admin Guide](#4-admin-guide)
   - 4.1 Login as Admin
   - 4.2 Admin Dashboard Overview
   - 4.3 Search & Filter Complaints
   - 4.4 Update Complaint Status
   - 4.5 View Complaint Details
   - 4.6 Delete a Complaint
5. [Color-Coded Status Guide](#5-status-guide)
6. [Complaint Categories](#6-complaint-categories)
7. [Troubleshooting](#7-troubleshooting)
8. [Technical Reference](#8-technical-reference)

---

## 1. System Overview

The **Citizen Complaint Management System (नागरिक तक्रार प्रणाली)** is an official Government of Maharashtra web portal that allows citizens to:

- Register and submit civic complaints (road, water, electricity, sanitation)
- Track the status of their complaints in real time
- Print official complaint receipts with reference numbers
- Receive updates when complaints are resolved

**Two user roles:**

| Role | Marathi | Access |
|------|---------|--------|
| CITIZEN | नागरिक | Submit & track own complaints |
| ADMIN | प्रशासक | Manage, update, delete all complaints |

---

## 2. Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Java 17+ (for backend)
- MySQL or compatible database

### Start the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Start the Frontend (React)

```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### First-Time Setup

Open `http://localhost:3000` in your browser. You will be redirected to the **Login page**.

---

## 3. Citizen Guide

### 3.1 Register a New Account

1. On the Login page, click **"नोंदणी करा / Register here"** link at the bottom.
2. Fill in the registration form:
   - **Full Name** — Your complete name
   - **Email Address** — Valid email (used for login)
   - **Password** — Minimum 6 characters
   - **Register As** — Select **CITIZEN** (default)
3. Click **"नोंदणी करा / Create Account"**
4. On success, you are automatically redirected to the Login page.

> **Note:** If you select ADMIN role during registration, you will get access to the Admin Dashboard instead.

---

### 3.2 Login

1. Open `http://localhost:3000/login`
2. Enter your **Email Address** and **Password**
3. Click **"Sign In"**
4. Citizens are redirected to `/citizen` (Citizen Dashboard)
5. Admins are redirected to `/admin` (Admin Dashboard)

---

### 3.3 Dashboard Overview

After login, the **Citizen Dashboard** shows:

```
┌─────────────────────────────────────────────────────────────────┐
│  ☸  नागरिक तक्रार प्रणाली  |  महाराष्ट्र शासन              │
│     Citizen Complaint Management System                         │
│                              [नागरिक | CITIZEN] [Logout]       │
├─────────────────────────────────────────────────────────────────┤
│  नमस्कार, [Your Name] 🙏              [+ नवीन तक्रार दाखल करा] │
│  Welcome | तुमच्या नागरिक तक्रारी व्यवस्थापित करा             │
├────────────┬────────────┬───────────────┬────────────────────────┤
│  📋 Total  │ ⏳ Pending │ 🔄 In Progress │  ✅ Resolved           │
│     3      │     1      │       1        │       1               │
├────────────┴────────────┴───────────────┴────────────────────────┤
│  [माझ्या तक्रारी]  [+ नवीन तक्रार]                            │
│                                                                  │
│  🔍 Search...   [Category ▼]   [Status ▼]                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Large potholes          [रस्ता/Road] [प्रलंबित/Pending] │   │
│  │  roads are not good                          ⏱ 2h ago    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Stats Cards explained:**

| Card | Meaning |
|------|---------|
| Total / एकूण | All complaints you have submitted |
| Pending / प्रलंबित | Submitted but not yet reviewed |
| In Progress / प्रगतीपथावर | Being addressed by authorities |
| Resolved / निराकरण | Complaint closed/fixed |

---

### 3.4 Submit a New Complaint

1. Click the orange **"नवीन तक्रार दाखल करा"** button (top-right of banner) OR click the **"+ नवीन तक्रार"** tab.
2. Fill in the complaint form:

   | Field | Description | Example |
   |-------|-------------|---------|
   | **Title / शीर्षक** | Short description of the problem | "Large pothole on Main Street" |
   | **Category / श्रेणी** | Type of civic issue | ROAD |
   | **Description / वर्णन** | Detailed explanation | Location, severity, since when |

3. Click **"📤 तक्रार सादर करा / Submit Complaint"**
4. On success, you will see a green alert and be redirected to the complaint list after 2 seconds.

> **Categories available:**
> - 🔴 **रस्ता / ROAD** — Potholes, damaged roads, street issues
> - 🔵 **पाणी / WATER** — Water supply, leakage, contamination
> - 🟡 **वीज / ELECTRICITY** — Power cuts, faulty streetlights, wire issues
> - 🟢 **स्वच्छता / SANITATION** — Garbage, drainage, cleanliness

---

### 3.5 View & Search Complaints

On the **"माझ्या तक्रारी / My Complaints"** tab:

**Search:**
- Type any keyword in the **🔍 search box** to filter by title or description

**Filter by Category:**
- Use the **"श्रेणी / Category"** dropdown to show only one category (e.g., WATER only)

**Filter by Status:**
- Use the **"स्थिती / Status"** dropdown to filter by:
  - सर्व / All
  - प्रलंबित / Pending
  - प्रगतीपथावर / In Progress
  - निराकरण / Resolved

**Complaint card shows:**
- Title and description (2 lines)
- Category badge (color-coded)
- Status badge (color-coded)
- Complaint reference number (`#ID`)
- Submitted time (hover to see exact date)
- Last updated time (if updated by admin)

---

### 3.6 View Complaint Details

1. Click on any complaint card to open the **Detail Modal**.
2. The modal shows:
   - **Official Reference Number:** `MH/CCS/2025/00001`
   - Full description
   - Category and Status badges
   - Complaint ID, Category, Submitted date, Last Updated date
   - **Status message** in Marathi and English

**Status messages:**
- 🟡 **PENDING:** "तुमची तक्रार प्राप्त झाली आहे. लवकरच कारवाई केली जाईल."
- 🔵 **IN PROGRESS:** "तुमच्या तक्रारीवर कारवाई सुरू आहे."
- 🟢 **RESOLVED:** "तुमची तक्रार यशस्वीरित्या निराकरण केली गेली आहे."

---

### 3.7 Print Complaint Receipt

1. Open a complaint's detail modal (click any complaint card).
2. Click the **"🖨️ पावती प्रिंट करा / Print Receipt"** button.
3. A print-ready window opens with:
   - Tricolor header (saffron-white-green)
   - Ashoka Chakra (☸) and portal branding
   - Official Reference Number
   - All complaint details in a formatted table
   - Computer-generated document disclaimer
   - Helpline and email contact
4. Your browser's print dialog will open automatically.
5. Save as PDF or print on paper.

> **Receipt Reference Format:** `MH/CCS/YYYY/NNNNN`
> Example: `MH/CCS/2025/00001`

---

### 3.8 Logout

Click **"बाहेर पडा / Logout"** button in the top-right of the header.

On mobile: tap the ☰ menu icon → "बाहेर पडा / Logout"

---

## 4. Admin Guide

### 4.1 Login as Admin

1. Open `http://localhost:3000/login`
2. Enter admin email and password
3. Click **Sign In** — redirected to `/admin`

> To create an admin account, register with **"Register As: ADMIN"** on the registration page.

---

### 4.2 Admin Dashboard Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  ☸  नागरिक तक्रार प्रणाली  |  महाराष्ट्र शासन               │
│                              [प्रशासक | ADMIN] [Logout]         │
├──────────────────────────────────────────────────────────────────┤
│  प्रशासक डॅशबोर्ड / Admin Dashboard 🛠️                         │
│  सर्व नागरिक तक्रारी व्यवस्थापित करा                           │
├──────────┬─────────────┬─────────────────┬───────────────────────┤
│  Total   │   Pending   │   In Progress   │      Resolved         │
│    10    │      4      │        3        │          3            │
├──────────┴─────────────┴─────────────────┴───────────────────────┤
│  🔍 Search...   [Status ▼]   [Category ▼]   10 / 10 तक्रारी    │
├──────────────────────────────────────────────────────────────────┤
│  # │ Title         │ Category │ Citizen │ Status │ Update │ Del  │
│  1 │ Large pothole │ [ROAD]   │ Dipak   │[PEND.] │ [▼]    │ [🗑] │
│  2 │ Water leakage │ [WATER]  │ Amit    │[IN PR] │ [▼]    │ [🗑] │
└──────────────────────────────────────────────────────────────────┘
```

---

### 4.3 Search & Filter Complaints

Same as citizen dashboard, plus you can **search by citizen name**.

- **Search box:** Searches title, description, AND citizen name
- **Status filter:** ALL / Pending / In Progress / Resolved
- **Category filter:** ALL / Road / Water / Electricity / Sanitation
- **Count display:** Shows `X / Total` filtered complaints

---

### 4.4 Update Complaint Status

Each row in the table has a colored **Status dropdown**:

1. Find the complaint row
2. Click the **dropdown in the "Update Status" column**
3. Select the new status:
   - `प्रलंबित / Pending`
   - `प्रगतीपथावर / In Progress`
   - `निराकरण / Resolved`
4. The change is saved immediately — a success alert appears at the top

> The dropdown background color matches the current status (yellow = pending, blue = in progress, green = resolved).

---

### 4.5 View Complaint Details (Admin)

Click the **ℹ️ info icon button** in the Actions column to open the Detail Modal showing:
- Full complaint title and description
- Category and Status badges
- Citizen name and email
- Submitted and last updated timestamps

---

### 4.6 Delete a Complaint

1. Click the **🗑️ red delete icon button** in the Actions column
2. A **Confirmation Dialog** appears:
   > "तक्रार #X कायमची हटवायची आहे का? ही क्रिया पूर्ववत होणार नाही."
   > "Are you sure you want to permanently delete complaint #X? This cannot be undone."
3. Click **"हो, हटवा / Yes, Delete"** to confirm
4. Or click **"रद्द करा / Cancel"** to go back

> **Warning:** Deletion is permanent and cannot be undone.

---

## 5. Status Guide

| Status | Color | Marathi | Meaning |
|--------|-------|---------|---------|
| PENDING | 🟡 Yellow | प्रलंबित | Complaint received, awaiting review |
| IN_PROGRESS | 🔵 Blue | प्रगतीपथावर | Being actively worked on |
| RESOLVED | 🟢 Green | निराकरण | Issue fixed, complaint closed |

**Visual indicators:**
- Each complaint card has a **colored left border** matching its status
- Badges use matching background colors
- Table rows have a colored left border

---

## 6. Complaint Categories

| Category | Icon | Marathi | Examples |
|----------|------|---------|---------|
| ROAD | 🔴 | रस्ता | Potholes, damaged footpath, road flooding |
| WATER | 🔵 | पाणी | No water supply, pipe leakage, dirty water |
| ELECTRICITY | 🟡 | वीज | Power outage, broken streetlight, loose wires |
| SANITATION | 🟢 | स्वच्छता | Garbage not collected, blocked drain, open defecation |

---

## 7. Troubleshooting

### App shows blank screen / white page
- Make sure backend is running on port 8080
- Check browser console (F12) for errors
- Try hard refresh: `Ctrl + Shift + R`

### Login fails with "Login failed"
- Verify email and password are correct
- Make sure backend is running (`http://localhost:8080`)
- Check your database connection in `backend/src/main/resources/application.properties`

### Complaints not loading
- Backend may be down — restart with `mvn spring-boot:run`
- Check `application.properties` database URL, username, password

### Print receipt not opening
- Allow popups for `localhost:3000` in your browser
- Chrome: Address bar → ⚠️ icon → Allow popups

### Mobile menu not showing
- Resize browser to < 600px wide or use actual mobile device
- Hamburger ☰ menu appears in top-right on mobile

### "Submitted:" shows empty timestamp
- This is fixed in the new version via `dateUtils.js`
- If still empty, ensure backend is returning `createdAt` and `updatedAt` fields in the API response

---

## 8. Technical Reference

### Project Structure

```
project/
├── frontend/                   # React 18 + MUI 5 frontend
│   ├── src/
│   │   ├── App.js              # Router + ThemeProvider
│   │   ├── index.css           # Base styles + Auth page CSS
│   │   ├── theme/
│   │   │   └── govTheme.js     # MUI theme (Govt colors)
│   │   ├── components/
│   │   │   ├── Navbar.js       # Government header (tricolor + Ashoka Chakra)
│   │   │   └── AshokaChakra.js # SVG Ashoka Chakra (24 spokes)
│   │   ├── pages/
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Registration page
│   │   │   ├── CitizenDashboard.js  # Citizen portal
│   │   │   └── AdminDashboard.js    # Admin portal
│   │   ├── services/
│   │   │   └── api.js          # Axios API client
│   │   ├── context/
│   │   │   └── AuthContext.js  # JWT auth state
│   │   └── utils/
│   │       └── dateUtils.js    # formatDate(), timeAgo()
│   └── package.json
│
└── backend/                    # Spring Boot REST API
    └── src/main/java/com/citizen/complaint/
        ├── controller/         # AuthController, ComplaintController
        ├── service/            # UserService, ComplaintService
        ├── entity/             # User, Complaint, Role, Category
        ├── repository/         # JPA repositories
        ├── security/           # JWT filter and utility
        └── config/             # Security and Swagger config
```

### API Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/complaints` | CITIZEN | Submit new complaint |
| GET | `/api/complaints/my` | CITIZEN | Get own complaints |
| GET | `/api/complaints` | ADMIN | Get all complaints |
| PUT | `/api/complaints/{id}/status` | ADMIN | Update status |
| DELETE | `/api/complaints/{id}` | ADMIN | Delete complaint |

### Government Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| India Navy | `#003580` | Primary, headers, buttons |
| Saffron | `#FF9933` | Accent, secondary buttons, highlights |
| India Green | `#138808` | Success, resolved status |
| Light Navy | `#001F4D` | Dark gradients |
| Warning Yellow | `#F57F17` | Pending status |
| Info Blue | `#0277BD` | In Progress status |

### Running Both (Backend + Frontend together)

**Terminal 1 — Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
```

Open browser at `http://localhost:3000`

---

*दस्तऐवज आवृत्ती: 2.0 | Document Version: 2.0*
*नागरिक तक्रार प्रणाली | Citizen Complaint Management System*
*© 2025 महाराष्ट्र शासन | Government of Maharashtra*
