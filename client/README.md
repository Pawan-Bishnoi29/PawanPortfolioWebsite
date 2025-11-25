# Pawan.dev Portfolio

Personal security‑focused portfolio website built with React and Node.js, featuring an admin panel to manage projects, skills, achievements, certificates, and articles.

## Tech Stack

- Frontend:
  - React (SPA with React Router)
  - CSS (custom design with glassmorphism cards and dark/light theme)
  - React Icons

- Backend:
  - Node.js
  - Express.js
  - Nodemailer (contact form email sending)
  - In‑memory REST APIs for Projects, Skills, Achievements, Certificates, and Articles

- Other:
  - Git & GitHub
  - Environment variables via `.env`

## Features

- Modern hero section with “What I Do” cards.
- Dark / Light theme toggle with CSS variables.
- Dynamic sections:
  - Projects, Skills, Achievements, Certificates, Articles, Contact.
- Admin panel:
  - Login gate (simple password check).
  - Full CRUD for:
    - Projects (add/edit/delete, tech stack, demo/code links).
    - Skills (grouped skills, add/edit/delete).
    - Achievements (bug bounty / security achievements).
    - Certificates (title, org, year, verify URL).
    - Articles (title, date, tagline, excerpt, link).
- Contact form:
  - Sends email using Nodemailer and Gmail app password.
- Resources section:
  - Downloadable resume PDF from `/public`.
  - Sample security report link.
  - GitHub profile and labs repository links.

## Getting Started (Local Setup)

1. Clone the repository:



git clone https://github.com/Pawan-Bishnoi29/PawanPortfolioWebsite.git

cd your-portfolio-repo
2. Install frontend dependencies:
npm install

3. Setup backend (if in separate `server` folder, go there; otherwise run in root):

cd server # if you have a server folder
npm install


4. Create `.env` file for backend:

MAIL_USER=yourgmail@gmail.com
MAIL_PASS=your_app_password
MAIL_TO=destination_email@example.com
PORT=5000


5. Run backend server:

npm start # or node index.js / nodemon index.js


6. Run frontend (in React app folder):

npm start


7. Open in browser:

- Frontend: http://localhost:3000  
- Backend health check: http://localhost:5000/api/health

## Admin Panel

- URL: `http://localhost:3000/admin`
- Default password (from code): `Pawan_Admin_Only`
- After login, you can:
- Add / edit / delete Projects, Skills, Achievements, Certificates, and Articles.
- Changes are immediately visible on the corresponding frontend sections (via REST APIs).

## Project Structure (High Level)

- `src/`
- `components/layout/Navbar.jsx`
- `components/sections/Hero.jsx`
- `components/sections/Projects.jsx`
- `components/sections/Skills.jsx`
- `components/sections/Certificates.jsx`
- `components/sections/Achievements.jsx`
- `components/sections/Articles.jsx`
- `components/sections/Contact.jsx`
- `components/sections/Resources.jsx`
- `components/admin/Admin.jsx`
- `App.js`
- `App.css`
- `server/` (or backend root)
- `index.js` (Express server + APIs + Nodemailer)
- `public/`
- `Pawan_Kumar_Resume.pdf`
- `Sample_Security_Report.pdf`

## Future Improvements

- Persist data using MongoDB instead of in‑memory arrays.
- Add authentication for admin (JWT / session based).
- Deploy frontend and backend (e.g., Vercel + Render / Railway).
- Add more security‑focused projects and writeups.

## License

This project is for personal portfolio use. Please do not copy the design or content directly without permission.


