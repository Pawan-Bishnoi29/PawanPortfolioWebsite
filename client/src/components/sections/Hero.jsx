import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <p className="tag">Java Full Stack · Security Researcher</p>

          <h1>
            Securing Web Apps with
            <br />
            Full‑Stack & Offensive Security
          </h1>

          <p className="subtitle">
            Full‑stack developer and cybersecurity enthusiast with hands‑on
            experience in e‑commerce, bug bounty, and web application security.
          </p>

          {/* New badges row */}
          <div className="hero-badges">
            <span>Web App Pentesting</span>
            <span>API Security</span>
            <span>Secure MERN Apps</span>
          </div>

          <div className="hero-buttons">
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-outline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* What I Do Section - Hero ke turant neeche, sirf Home page pe dikh raha hai kyunki Hero sirf / me use ho raha hai */}
      <section className="whatido">
        <div className="whatido-header">
          <h2>What I Do</h2>
          <p>
            I secure web applications, APIs, and infrastructure using modern
            full‑stack development and security practices.
          </p>
        </div>

        <div className="whatido-grid">
          <div className="whatido-card">
            <h3>Web App Pentesting</h3>
            <p>
              Identifying OWASP Top 10 vulnerabilities in real‑world web apps
              with practical proof‑of‑concepts and clear remediation steps.
            </p>
          </div>

          <div className="whatido-card">
            <h3>API & Backend Security</h3>
            <p>
              Testing authentication, authorization, and input validation for
              REST APIs, Node.js backends, and microservices.
            </p>
          </div>

          <div className="whatido-card">
            <h3>Full Stack Development</h3>
            <p>
              Building secure MERN applications with clean architecture, reusable
              components, and production‑ready features.
            </p>
          </div>

          <div className="whatido-card">
            <h3>Automation & Tooling</h3>
            <p>
              Creating custom scripts and tools for recon, scanning, and
              reporting to speed up security workflows.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
