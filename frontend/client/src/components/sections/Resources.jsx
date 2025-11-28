import React from "react";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

const Resources = () => {
  return (
    <section className="section resources">
      <h2>Resources & Code</h2>
      <p className="resources-subtitle">
        Download my resume, review sample reports, and explore my security and full‑stack projects on GitHub.
      </p>

      <div className="grid">
        {/* Resume card */}
        <div className="card">
          <h3>Resume (PDF)</h3>
          <p>
            Up‑to‑date overview of my experience in Java full‑stack development and web application security.
          </p>
          <div className="resources-actions">
            <a
              href="/Pawan_Kumar_Resume.pdf"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileAlt style={{ marginRight: 8 }} />
              View / Download
            </a>
          </div>
        </div>

        {/* Sample report */}
        <div className="card">
          <h3>Sample Security Report</h3>
          <p>
            Redacted penetration test / bug bounty style report showing findings, impact, and remediation steps.
          </p>
          <div className="resources-actions">
            <a
              href="/Sample_Security_Report.pdf"
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileAlt style={{ marginRight: 8 }} />
              Download Sample
            </a>
          </div>
        </div>

        {/* GitHub profile */}
        <div className="card">
          <h3>GitHub Profile</h3>
          <p>
            Source code for my security tools, automation scripts, and full‑stack projects, all in one place.
          </p>
          <div className="resources-actions">
            <a
              href="https://github.com/Pawan-Bishnoi29"
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub style={{ marginRight: 8 }} />
              Visit GitHub
            </a>
          </div>
        </div>

        {/* Optional: Security labs repo */}
        <div className="card">
          <h3>Security Labs Repo</h3>
          <p>
            Curated vulnerable labs and practice setups for web app and API security testing.
          </p>
          <div className="resources-actions">
            <a
              href="https://github.com/Pawan-Bishnoi29"
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub style={{ marginRight: 8 }} />
              Open Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
