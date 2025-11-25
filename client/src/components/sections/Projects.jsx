import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("Failed to load projects", err);
      });
  }, []);

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            className="card"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.tech && (
              <div className="tags">
                {p.tech.map((t) => (
                  <span key={t} className="tag-tech">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="card-link"
              >
                View Details
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
