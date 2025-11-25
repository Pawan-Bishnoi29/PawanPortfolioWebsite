
import React, { useState, useEffect } from "react";
import axios from "axios";
import { skillsAdminData } from "../../data/skillsAdminData";

const Admin = () => {
  const [tab, setTab] = useState("projects");

  return (
    <div className="section">
      <h2>Admin Panel</h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects
        </TabButton>
        <TabButton active={tab === "articles"} onClick={() => setTab("articles")}>
          Articles
        </TabButton>
        <TabButton active={tab === "skills"} onClick={() => setTab("skills")}>
          Skills
        </TabButton>
        <TabButton
          active={tab === "achievements"}
          onClick={() => setTab("achievements")}
        >
          Achievements
        </TabButton>
        <TabButton
          active={tab === "certificates"}
          onClick={() => setTab("certificates")}
        >
          Certificates
        </TabButton>
        {/* NEW: Activity tab */}
        <TabButton active={tab === "activity"} onClick={() => setTab("activity")}>
          Activity Timeline
        </TabButton>
      </div>

      {tab === "projects" && <ProjectsAdmin />}
      {tab === "articles" && <ArticlesAdmin />}
      {tab === "skills" && <SkillsAdmin />}
      {tab === "achievements" && <AchievementsAdmin />}
      {tab === "certificates" && <CertificatesAdmin />}
      {tab === "activity" && <ActivityAdmin />}
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    className="btn-outline"
    style={{
      borderColor: active ? "var(--accent)" : "rgba(148,163,184,0.4)",
      background: active ? "rgba(34,197,94,0.08)" : "transparent",
    }}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

/* -------- Projects admin (API-based CRUD) -------- */

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    title: "",
    description: "",
    tech: "",
    link: "",
    demo: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      title: "",
      description: "",
      tech: "",
      link: "",
      demo: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.title) return;

    const techArray = current.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: current.title,
      description: current.description,
      tech: techArray,
      link: current.link,
      demo: current.demo,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/projects",
          payload
        );
        setProjects([...projects, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/projects/${current.id}`,
          payload
        );
        setProjects(
          projects.map((p) => (p.id === current.id ? res.data : p))
        );
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (project) => {
    setCurrent({
      id: project.id,
      title: project.title,
      description: project.description,
      tech: (project.tech || []).join(", "),
      link: project.link || "",
      demo: project.demo || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Project" : "Edit Project"}</h3>
        <div className="contact-form">
          <input
            name="title"
            placeholder="Title"
            value={current.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            value={current.description}
            onChange={handleChange}
          />
          <input
            name="tech"
            placeholder="Tech (comma separated)"
            value={current.tech}
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Code URL (GitHub)"
            value={current.link}
            onChange={handleChange}
          />
          <input
            name="demo"
            placeholder="Demo URL (optional)"
            value={current.demo}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Project" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Projects</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Yahan se edit/delete kar sakta hai.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.description}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(p)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No projects yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------- Articles admin (API-based CRUD) -------- */

const ArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    title: "",
    date: "",
    tagline: "",
    excerpt: "",
    link: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to load articles", err));
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      title: "",
      date: "",
      tagline: "",
      excerpt: "",
      link: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.title) return;

    const payload = {
      title: current.title,
      date: current.date,
      tagline: current.tagline,
      excerpt: current.excerpt,
      link: current.link,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/articles",
          payload
        );
        setArticles([...articles, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/articles/${current.id}`,
          payload
        );
        setArticles(
          articles.map((a) => (a.id === current.id ? res.data : a))
        );
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (article) => {
    setCurrent({
      id: article.id,
      title: article.title || "",
      date: article.date || "",
      tagline: article.tagline || "",
      excerpt: article.excerpt || "",
      link: article.link || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      setArticles(articles.filter((a) => a.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Article" : "Edit Article"}</h3>
        <div className="contact-form">
          <input
            name="title"
            placeholder="Title"
            value={current.title}
            onChange={handleChange}
          />
          <input
            name="date"
            placeholder="Date (e.g. Nov 2025)"
            value={current.date}
            onChange={handleChange}
          />
          <input
            name="tagline"
            placeholder="Tagline (e.g. Bug bounty writeup)"
            value={current.tagline}
            onChange={handleChange}
          />
          <textarea
            name="excerpt"
            placeholder="Short summary"
            rows={3}
            value={current.excerpt}
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Full article URL (optional)"
            value={current.link}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Article" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Articles</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Yahan se edit/delete kar sakta hai.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {articles.map((a) => (
            <div
              key={a.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {a.date}
                  {a.tagline ? ` • ${a.tagline}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(a)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No articles yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------- Skills admin (API-based CRUD) -------- */

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    category: "",
    items: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Failed to load skills", err));
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      category: "",
      items: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.category) return;

    const itemsArray = current.items
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      category: current.category,
      items: itemsArray,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/skills",
          payload
        );
        setSkills([...skills, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/skills/${current.id}`,
          payload
        );
        setSkills(
          skills.map((s) => (s.id === current.id ? res.data : s))
        );
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (group) => {
    setCurrent({
      id: group.id,
      category: group.category,
      items: (group.items || []).join(", "),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill group?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      setSkills(skills.filter((s) => s.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Skill Group" : "Edit Skill Group"}</h3>
        <div className="contact-form">
          <input
            name="category"
            placeholder="Category (e.g. Frontend, Security)"
            value={current.category}
            onChange={handleChange}
          />
          <input
            name="items"
            placeholder="Skills (comma separated)"
            value={current.items}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Group" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Skill Groups</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Yahan se edit/delete kar sakta hai.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {skills.map((group) => (
            <div
              key={group.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {group.category}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {(group.items || []).join(", ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(group)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(group.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No skill groups yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------- Achievements admin (API-based CRUD) -------- */

const AchievementsAdmin = () => {
  const [achievements, setAchievements] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/achievements")
      .then((res) => setAchievements(res.data))
      .catch((err) => console.error("Failed to load achievements", err));
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      title: "",
      description: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.title) return;

    const payload = {
      title: current.title,
      description: current.description,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/achievements",
          payload
        );
        setAchievements([...achievements, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/achievements/${current.id}`,
          payload
        );
        setAchievements(
          achievements.map((a) => (a.id === current.id ? res.data : a))
        );
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (achievement) => {
    setCurrent({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/achievements/${id}`);
      setAchievements(achievements.filter((a) => a.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Achievement" : "Edit Achievement"}</h3>
        <div className="contact-form">
          <input
            name="title"
            placeholder="Title"
            value={current.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            value={current.description}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Achievement" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Achievements</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Yahan se edit/delete kar sakta hai.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {achievements.map((a) => (
            <div
              key={a.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {a.description}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(a)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {achievements.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No achievements yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------- Certificates admin (API-based CRUD) -------- */

const CertificatesAdmin = () => {
  const [certs, setCerts] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    title: "",
    org: "",
    year: "",
    link: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/certificates")
      .then((res) => setCerts(res.data))
      .catch((err) =>
        console.error("Failed to load certificates", err)
      );
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      title: "",
      org: "",
      year: "",
      link: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.title) return;

    const payload = {
      title: current.title,
      org: current.org,
      year: current.year,
      link: current.link,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/certificates",
          payload
        );
        setCerts([...certs, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/certificates/${current.id}`,
          payload
        );
        setCerts(certs.map((c) => (c.id === current.id ? res.data : c)));
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (cert) => {
    setCurrent({
      id: cert.id,
      title: cert.title || "",
      org: cert.org || "",
      year: cert.year || "",
      link: cert.link || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/certificates/${id}`);
      setCerts(certs.filter((c) => c.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Certificate" : "Edit Certificate"}</h3>
        <div className="contact-form">
          <input
            name="title"
            placeholder="Certificate title"
            value={current.title}
            onChange={handleChange}
          />
          <input
            name="org"
            placeholder="Organization (e.g. Coursera, TryHackMe)"
            value={current.org}
            onChange={handleChange}
          />
          <input
            name="year"
            placeholder="Year (e.g. 2025)"
            value={current.year}
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Verify URL (optional)"
            value={current.link}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Certificate" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Certificates</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Yahan se edit/delete kar sakta hai.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {certs.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.org} {c.year && `• ${c.year}`}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(c)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {certs.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No certificates yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------- Activity Timeline admin (API-based CRUD) -------- */

const ActivityAdmin = () => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState({
    id: null,
    date: "",
    title: "",
    description: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activity")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load activity", err));
  }, []);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCurrent({
      id: null,
      date: "",
      title: "",
      description: "",
      type: "",
    });
  };

  const handleSubmit = async () => {
    if (!current.title) return;

    const payload = {
      date: current.date,
      title: current.title,
      description: current.description,
      type: current.type,
    };

    try {
      if (current.id == null) {
        const res = await axios.post(
          "http://localhost:5000/api/activity",
          payload
        );
        setItems([...items, res.data]);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/activity/${current.id}`,
          payload
        );
        setItems(
          items.map((a) => (a.id === current.id ? res.data : a))
        );
      }
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEditClick = (item) => {
    setCurrent({
      id: item.id,
      date: item.date || "",
      title: item.title || "",
      description: item.description || "",
      type: item.type || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/activity/${id}`);
      setItems(items.filter((a) => a.id !== id));
      if (current.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>{current.id == null ? "Add Activity" : "Edit Activity"}</h3>
        <div className="contact-form">
          <input
            name="date"
            placeholder="Date (e.g. 2025-11-24 or Nov 2025)"
            value={current.date}
            onChange={handleChange}
          />
          <input
            name="title"
            placeholder="Title"
            value={current.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            value={current.description}
            onChange={handleChange}
          />
          <select
            name="type"
            value={current.type}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.3)",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "13px",
            }}
          >
            <option value="">Type (optional)</option>
            <option value="security">Security</option>
            <option value="development">Development</option>
          </select>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              {current.id == null ? "Add Activity" : "Save Changes"}
            </button>
            {current.id != null && (
              <button
                type="button"
                className="btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Existing Activity</h3>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          Timeline me dikhne wali entries yahan se manage kar.
        </p>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.date}
                  {item.type ? ` • ${item.type}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ fontSize: "11px", padding: "4px 10px" }}
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "#b91c1c",
                    borderColor: "#b91c1c",
                  }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              No activity yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
