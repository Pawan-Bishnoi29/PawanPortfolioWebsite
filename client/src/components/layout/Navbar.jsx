import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = ({ theme, setTheme }) => {
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="nav-link-brand">
          Pawan.dev
        </Link>
      </div>

      <ul>
        <li className={isActive("/") ? "nav-active" : ""}>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className={isActive("/projects") ? "nav-active" : ""}>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
        </li>
        <li className={isActive("/skills") ? "nav-active" : ""}>
          <Link to="/skills" className="nav-link">
            Skills
          </Link>
        </li>
        <li className={isActive("/certificates") ? "nav-active" : ""}>
          <Link to="/certificates" className="nav-link">
            Certificates
          </Link>
        </li>
        <li className={isActive("/achievements") ? "nav-active" : ""}>
          <Link to="/achievements" className="nav-link">
            Achievements
          </Link>
        </li>
        <li className={isActive("/articles") ? "nav-active" : ""}>
          <Link to="/articles" className="nav-link">
            Articles
          </Link>
        </li>
        <li className={isActive("/contact") ? "nav-active" : ""}>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Theme toggle */}
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="theme-toggle-thumb">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>

        <div className="nav-icons">
          <a
            href="https://github.com/Pawan-Bishnoi29"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/pawan-bishnoi-5a79752b1/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
