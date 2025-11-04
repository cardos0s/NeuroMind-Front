# MVP 2.0 – Role-Based Login (Professional & Patient)

## 🎯 Objective
Introduce role-based authentication, allowing professionals and patients to log into separate dashboards.  
Each professional will be able to submit reports for their patients, and each patient (or caregiver) will be able to access these reports in real time.

---

## 📦 Scope of This MVP
- Add a **role selection screen** before login (`Professional` or `Patient`).
- Implement **login and registration pages** for each role.
- Integrate both with the existing NeuroMind API.
- Prepare the base for the **Clinic module**, coming next.

---

## 🧩 Features
### 1. Role Selection
- Simple screen for users to choose between:
  - 👩‍⚕️ Professional
  - 🧍‍♀️ Patient
- Redirects to the proper login page.

### 2. Professional Login
- Login and registration for therapists, speech-language pathologists, and occupational therapists.
- After login, the user will access the **Professional Dashboard** to:
  - View linked patients.
  - Create, edit, and delete therapy reports.
  - See quick insights on session history.

### 3. Patient Login
- Login and registration for patients or caregivers.
- After login, the user will access the **Patient Dashboard** to:
  - View their assigned professional and clinic.
  - Access all published reports.
  - (Future) See progress charts and feedbacks.

---

## 🧱 Technical Overview
**Frontend (React + TypeScript + Vite)**
- New pages:
  - `/login`
  - `/login/professional`
  - `/login/patient`
  - `/dashboard/professional`
  - `/dashboard/patient`

**Backend (ASP.NET Core API)**
- Endpoints:
  - `POST /auth/register-professional`
  - `POST /auth/register-patient`
  - `POST /reports`
  - `GET /reports/{patientId}`

**Database**
- Tables:
  - `Professionals`
  - `Patients`
  - `Reports`

---

## 🚀 Next Steps
- Integrate login pages with API authentication.
- Add dashboard layout and route protection.
- Connect reports between professionals and patients.
- Prepare for **multi-clinic mode (SaaS version)** after validation with the Maria e João Clinic.

---

## 🧭 Validation Plan
This MVP will first be deployed and tested at **Clínica Maria e João** to validate:
- The role-based access flow.
- Report submission and retrieval.
- User experience for both professionals and caregivers.

Feedback from this real-world test will guide the next iteration.
