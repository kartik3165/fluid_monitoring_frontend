# Hospital Fluid Monitoring Dashboard 💧

A responsive web application built with **React.js** and **Vite** for monitoring patient fluid levels in a hospital setting. This dashboard provides a clean, modern UI with real-time updates, color-coded status indicators, and historical data visualization to help healthcare professionals make informed decisions.


---

## ✨ Features

* **Secure, Role-Based Login:**
    * OTP-based login for standard users.
    * Separate username/password login for admins.
* **Real-Time Dashboard:** A main dashboard overview of all patient beds, with data that simulates real-time updates.
* **Collapsible Sidebar Navigation:** Professional and scalable navigation for different sections of the app.
* **Patient Details Page:** Click on a patient to view a detailed history page with an interactive chart showing fluid levels over time.
* **All-Patients View:** A sortable and searchable data table for a compact view of all patients.
* **Modern UI/UX:** Built with **Tailwind CSS** and **shadcn/ui** for a clean, professional, and fully responsive design that works on desktop, tablet, and mobile.
* **Alert System:** Patient cards and data visualizations use color-coding to indicate `Normal`, `Warning`, and `Critical` statuses.

---

## 🛠️ Tech Stack

* **Frontend:** [React.js](https://react.dev/), [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Charting:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Backend Simulation:** A mock API to simulate backend responses for login, patient data, and history.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (LTS version) and `npm` installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
    ```
    *(Replace with your actual GitHub repository URL)*

2.  **Navigate to the project directory:**
    ```bash
    cd fluid-monitoring-dashboard
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be running on `http://localhost:5173`.

---

## 📋 Usage

* **User Login:** Use the default OTP login screen.
    * Enter any phone number.
    * The mock OTP is `123456`.
* **Admin Login:** Click the "Admin Login" link.
    * **Username:** `nurse` or `doctor`
    * **Password:** `pass123`

---
## ⬆️ Pushing Changes to GitHub

After you've made changes to the project, follow these steps to save them and upload them to your GitHub repository.

1.  **Check the status of your changes** to see which files you've modified:
    ```bash
    git status
    ```

2.  **Stage all your changes** to be saved. The `.` adds all modified files.
    ```bash
    git add .
    ```

3.  **Commit your changes** with a descriptive message explaining what you did:
    ```bash
    git commit -m "feat: Add new patient data table"
    ```
    *(**Tip:** Good commit messages are helpful! Common prefixes include `feat:` for new features, `fix:` for bug fixes, and `chore:` for maintenance.)*

4.  **Push your saved commits** to your remote repository on GitHub:
    ```bash
    git push
    ```
    ---
    
## 📄 License

This project is licensed under the MIT License.