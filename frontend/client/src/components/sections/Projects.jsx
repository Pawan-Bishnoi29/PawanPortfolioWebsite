import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const statusColors = {
  Live: "#22c55e",
  "In Progress": "#eab308",
  Deprecated: "#64748b",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("Failed to load projects", err);
      });
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (!p.status || statusFilter === "All") return true;
    return p.status === statusFilter;
  });

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>

      {/* Status filter (optional but useful for hiring view) */}
      <div className="findings-filters">
        <div className="findings-filter-group">
          <label>Filter by status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Live">Live</option>
            <option value="In Progress">In Progress</option>
            <option value="Deprecated">Deprecated</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredProjects.map((p) => (
          <motion.div
            key={p.id}
            className="card"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="project-header">
              <h3>{p.title}</h3>
              {p.status && (
                <span
                  className="badge-status"
                  style={{ backgroundColor: statusColors[p.status] }}
                >
                  {p.status}
                </span>
              )}
            </div>

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
