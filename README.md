# MLSC Website – Custom Changes 🚀

This repository contains the MLSC website with additional features for committee management. Below are the **key enhancements** I’ve implemented:

---

## ✨ Features

### 🔹 1. Team Assemble – Task Manager
- Added a **Task Management Dashboard** (`TeamAssemble.jsx`) for committee members.  
- Features include:
  - Add tasks with **title, assignee, and priority**.  
  - Update task **status** (Pending → In Progress → Completed).  
  - View tasks in real-time using **LocalStorage**.  
  - Track progress with **stats cards** (Pending | In Progress | Completed).  

---

### 🔹 2. Routing Changes
- Updated `App.jsx` to add a route for Team Assemble:
  ```jsx
  {
    path: "teamassemble",
    element: <TeamAssemble />,
  }
  ```
- Clicking **Team Assemble** in the Team page now navigates directly to the Task Manager.

---

### 🔹 3. Root Layout Update
- Modified `Root.jsx` so the **Navbar is hidden** when on the Team Assemble dashboard for a distraction-free experience:
  ```jsx
  const hideNavbar = location.pathname === "/teamassemble";
  {!hideNavbar && <Navbar />}
  ```

---

### 🔹 4. UI/UX Enhancements
- Redesigned the dashboard with a **card-based layout**:
  - Left → Add Task form.  
  - Right → Team Tasks grid (with color-coded priority and statuses).  
  - Bottom → Stats cards in a **single row**.  
- Fully **responsive design** for both desktop and mobile.

---

## 📽️ Demo Video
👉 [Watch the Demo Video](https://drive.google.com/file/d/1J6C7FRf2ogJ9vVgmwvSb4kYQHc0xRwkP/view?usp=sharing)  

---

✅ With these changes, MLSC website now includes a secure, responsive, and real-time **Team Assemble Task Manager** for committee members.
