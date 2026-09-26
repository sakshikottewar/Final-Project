# Smart Facility Management Dashboard

## 1. Project Overview
Smart Facility Management Dashboard is a full-stack web application for managing facilities, inspections and complaints from one place.

The project contains:
- React frontend for the main dashboard
- Node.js + Express REST API backend
- MySQL database
- Angular module/page connected to the same REST API

## 2. Problem Statement
Facility information, inspection records and complaints are often maintained separately. This project provides a simple centralized system where users can view facility statistics, manage facilities, record inspections and track complaints.

## 3. Features
### Dashboard
- Total facilities
- Total inspections
- Open complaints
- Recent inspections

### Facilities
- View facilities
- Add facility
- Search facilities
- Facility status

### Inspections
- Create inspection
- View inspection history
- Inspection status and score

### Complaints
- Create complaint
- View complaints
- Update complaint status

### Angular API Module
- Separate Angular page
- Loads facilities from the Node.js REST API
- Demonstrates Angular components, service, HTTP Client and API integration

### Common Requirements
- Responsive UI
- Reusable React components
- Form validation
- REST API integration
- Database relationships
- Error handling
- Meaningful names
- Clean folder structure
- Basic automated API tests
- Git-ready documentation

## 4. Technology Stack
| Layer | Technology |
|---|---|
| Main frontend | React + Vite |
| Angular module | Angular |
| Backend | Node.js + Express |
| Database | MySQL |
| API | REST |
| Styling | CSS |
| Testing | Node.js built-in test runner |
| Version control | Git/GitHub |

## 5. Architecture
```text
React Frontend
      |
      | HTTP REST API
      v
Node.js + Express Backend
      |
      | mysql2
      v
MySQL Database

Angular API Module
      |
      | HTTP REST API
      v
Node.js + Express Backend
```

## 6. Project Structure
```text
Smart-Facility-Management-Dashboard/
├── README.md
├── database/
│   └── schema.sql
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── middleware/errorHandler.js
│   │   └── routes/
│   │       ├── dashboardRoutes.js
│   │       ├── facilityRoutes.js
│   │       ├── inspectionRoutes.js
│   │       └── complaintRoutes.js
│   └── tests/api.test.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── styles.css
│       └── components/
│           ├── Layout.jsx
│           ├── StatCard.jsx
│           ├── FacilityForm.jsx
│           └── FacilityTable.jsx
└── angular-module/
    ├── package.json
    ├── angular.json
    ├── tsconfig.json
    └── src/
        ├── main.ts
        ├── index.html
        ├── styles.css
        └── app/
            ├── app.component.ts
            └── facility.service.ts
```

## 7. Database Design
Tables:
- `users`
- `departments`
- `facilities`
- `inspections`
- `complaints`

Relationships:
- One department has many users.
- One department has many facilities.
- One facility has many inspections.
- One facility has many complaints.
- One user can create many inspections.
- One user can create many complaints.

Run `database/schema.sql` in MySQL Workbench or MySQL CLI.

## 8. API Documentation
Base URL:
`http://localhost:5000/api`

### Dashboard
- `GET /dashboard`

### Facilities
- `GET /facilities`
- `GET /facilities/:id`
- `POST /facilities`
- `PUT /facilities/:id`
- `DELETE /facilities/:id`

### Inspections
- `GET /inspections`
- `POST /inspections`

### Complaints
- `GET /complaints`
- `POST /complaints`
- `PUT /complaints/:id/status`

Example facility JSON:
```json
{
  "name": "Main Engineering Building",
  "location": "Badnera",
  "facility_type": "Academic",
  "status": "Active",
  "department_id": 1
}
```

## 9. Installation

### Requirements
Install:
- Node.js 18+
- MySQL 8+
- VS Code
- Angular CLI (optional globally)

### Step 1: Database
1. Open MySQL Workbench.
2. Open `database/schema.sql`.
3. Execute the complete file.
4. The database `smart_facility` will be created with sample data.

### Step 2: Backend
Open a terminal:
```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update the MySQL password:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_facility
```

Start:
```bash
npm run dev
```

Backend:
`http://localhost:5000`

### Step 3: React Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally:
`http://localhost:5173`

### Step 4: Angular Module
Open a third terminal:
```bash
cd angular-module
npm install
npm start
```

Open:
`http://localhost:4200`

The Angular page calls:
`http://localhost:5000/api/facilities`

## 10. Environment Variables
Backend `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_facility
```

Do not commit the real `.env` file to GitHub.

## 11. Form Validation and Error Handling
- Required fields are validated before API submission.
- Backend validates required request fields.
- Invalid IDs return 404.
- Database/API errors return JSON error messages.
- Frontend displays API errors to the user.

## 12. Testing
From the backend folder:
```bash
npm test
```

The included test checks the backend health endpoint without requiring the database.

## 13. Git / GitHub
Recommended commands:
```bash
git init
git add .
git commit -m "Initial smart facility dashboard"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

For later changes:
```bash
git add .
git commit -m "Add facility inspection features"
git push
```

## 14. Daily Submission Checklist
- [ ] Daily code pushed to GitHub
- [ ] Meaningful commit message
- [ ] Feature tested locally
- [ ] Screenshots captured
- [ ] README updated
- [ ] API tested
- [ ] Form validation checked
- [ ] Error handling checked
- [ ] Database changes documented
- [ ] No passwords or `.env` files committed

## 15. Challenges Faced
1. Connecting frontend applications to REST APIs.
2. Designing relationships between facilities, inspections and complaints.
3. Handling form validation and API errors.
4. Connecting an Angular page to an existing Node.js API.

## 16. Solutions
1. Created a centralized API helper in React.
2. Used foreign keys in MySQL.
3. Added frontend and backend validation.
4. Created an Angular service using HttpClient.

## 17. Future Improvements
- Authentication and role-based access
- Charts and analytics
- File/photo upload for inspections
- Email notifications
- Advanced filtering
- Pagination
- Docker deployment
- Cloud database
