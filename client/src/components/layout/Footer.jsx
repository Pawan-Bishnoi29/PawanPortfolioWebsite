import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      {/* Left side: mini bio + copyright */}
      <div className="footer-left">
        <span>© {new Date().getFullYear()} Pawan Bishnoi</span>
        <span>Full‑stack developer & security engineer securing web apps.</span>
      </div>

      {/* Right side: quick links / actions */}
      <div className="footer-right">
        <a href="/projects">View projects</a>
        <a href="/articles">Read articles</a>
        <a href="/contact">Work with me</a>
      </div>
    </div>
  </footer>
);

export default Footer;
