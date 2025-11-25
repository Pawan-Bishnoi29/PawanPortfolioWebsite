import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Certificates from "./components/sections/Certificates";
import Achievements from "./components/sections/Achievements";
import Articles from "./components/sections/Articles";
import Contact from "./components/sections/Contact";
import Admin from "./components/admin/Admin";
import Resources from "./components/sections/Resources";
import Timeline from "./components/sections/Timeline"; // NEW
import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState("dark");

  // first load pe theme restore
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(initial);
  }, []);

  // theme change hone pe body class + localStorage update
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-root">
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        {/* Home page: Hero + Timeline + Resources */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Timeline /> {/* Activity & Timeline section */}
              <Resources />
            </main>
          }
        />

        {/* Dedicated section pages */}
        <Route
          path="/projects"
          element={
            <main>
              <Projects />
            </main>
          }
        />
        <Route
          path="/skills"
          element={
            <main>
              <Skills />
            </main>
          }
        />
        <Route
          path="/certificates"
          element={
            <main>
              <Certificates />
            </main>
          }
        />
        <Route
          path="/achievements"
          element={
            <main>
              <Achievements />
            </main>
          }
        />
        <Route
          path="/articles"
          element={
            <main>
              <Articles />
            </main>
          }
        />
        <Route
          path="/contact"
          element={
            <main>
              <Contact />
            </main>
          }
        />

        {/* Resources dedicated page */}
        <Route
          path="/resources"
          element={
            <main>
              <Resources />
            </main>
          }
        />

        {/* Optional: dedicated timeline page */}
        <Route
          path="/activity"
          element={
            <main>
              <Timeline />
            </main>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Admin />
            ) : (
              <AdminLogin onSuccess={() => setIsAdmin(true)} />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// Inline admin login component
const AdminLogin = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Pawan_Admin_Only") {
      setError("");
      onSuccess();
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="section">
      <h2>Admin Login</h2>
      <form
        onSubmit={handleSubmit}
        className="contact-form"
        style={{ maxWidth: 300 }}
      >
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
        {error && <p className="status">{error}</p>}
      </form>
    </div>
  );
};

export default App;
