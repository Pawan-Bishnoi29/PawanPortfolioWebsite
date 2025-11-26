require("dotenv").config(); // ✦ env load

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// simple health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✦ NEW: transporter setup (Gmail + app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// contact form endpoint (ab email bhejega)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("New message:", { name, email, message });

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing fields" });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
});

/* =========================
   ✦ NEW: Skills API (CRUD)
   ========================= */

let skills = [
  {
    id: 1,
    category: "Security Tools",
    items: ["Burp Suite", "Nmap", "Metasploit"],
  },
];

// GET all skills
app.get("/api/skills", (req, res) => {
  res.json(skills);
});

// ADD skill group
app.post("/api/skills", (req, res) => {
  const { category, items } = req.body;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }
  const newSkillGroup = {
    id: skills.length ? skills[skills.length - 1].id + 1 : 1,
    category,
    items: items || [],
  };
  skills.push(newSkillGroup);
  res.status(201).json(newSkillGroup);
});

// UPDATE skill group
app.put("/api/skills/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = skills.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Skill group not found" });
  }

  const { category, items } = req.body;
  skills[index] = {
    ...skills[index],
    category: category ?? skills[index].category,
    items: items ?? skills[index].items,
  };

  res.json(skills[index]);
});

// DELETE skill group
app.delete("/api/skills/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = skills.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Skill group not found" });
  }
  const removed = skills[index];
  skills = skills.filter((s) => s.id !== id);
  res.json(removed);
});

// In-memory projects data
let projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern security-focused portfolio built with React.",
    tech: ["React", "Node.js", "CSS"],
    link: "https://github.com/Pawan-Bishnoi29",
    demo: "",
  },
];

// GET all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// ADD project
app.post("/api/projects", (req, res) => {
  const { title, description, tech, link, demo } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newProject = {
    id: projects.length ? projects[projects.length - 1].id + 1 : 1,
    title,
    description: description || "",
    tech: tech || [],
    link: link || "",
    demo: demo || "",
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// UPDATE project
app.put("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found" });
  }

  const { title, description, tech, link, demo } = req.body;
  projects[index] = {
    ...projects[index],
    title: title ?? projects[index].title,
    description: description ?? projects[index].description,
    tech: tech ?? projects[index].tech,
    link: link ?? projects[index].link,
    demo: demo ?? projects[index].demo,
  };

  res.json(projects[index]);
});

// DELETE project
app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found" });
  }
  const removed = projects[index];
  projects = projects.filter((p) => p.id !== id);
  res.json(removed);
});

/* =========================
   ✦ NEW: Achievements API (CRUD)
   ========================= */

let achievements = [
  {
    id: 1,
    title: "Reported Critical Vulnerability",
    description:
      "Discovered and reported a critical web application vulnerability with a valid bug bounty acknowledgment.",
  },
];

// GET all achievements
app.get("/api/achievements", (req, res) => {
  res.json(achievements);
});

// ADD achievement
app.post("/api/achievements", (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newAchievement = {
    id: achievements.length
      ? achievements[achievements.length - 1].id + 1
      : 1,
    title,
    description: description || "",
  };

  achievements.push(newAchievement);
  res.status(201).json(newAchievement);
});

// UPDATE achievement
app.put("/api/achievements/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = achievements.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Achievement not found" });
  }

  const { title, description } = req.body;
  achievements[index] = {
    ...achievements[index],
    title: title ?? achievements[index].title,
    description: description ?? achievements[index].description,
  };

  res.json(achievements[index]);
});

// DELETE achievement
app.delete("/api/achievements/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = achievements.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Achievement not found" });
  }

  const removed = achievements[index];
  achievements = achievements.filter((a) => a.id !== id);
  res.json(removed);
});

/* =========================
   ✦ NEW: Certificates API (CRUD)
   ========================= */

let certificates = [
  {
    id: 1,
    title: "Certified Ethical Hacker (Practice Lab)",
    org: "Example Org",
    year: "2025",
    link: "",
  },
];

// GET all certificates
app.get("/api/certificates", (req, res) => {
  res.json(certificates);
});

// ADD certificate
app.post("/api/certificates", (req, res) => {
  const { title, org, year, link } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newCert = {
    id: certificates.length
      ? certificates[certificates.length - 1].id + 1
      : 1,
    title,
    org: org || "",
    year: year || "",
    link: link || "",
  };

  certificates.push(newCert);
  res.status(201).json(newCert);
});

// UPDATE certificate
app.put("/api/certificates/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = certificates.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Certificate not found" });
  }

  const { title, org, year, link } = req.body;
  certificates[index] = {
    ...certificates[index],
    title: title ?? certificates[index].title,
    org: org ?? certificates[index].org,
    year: year ?? certificates[index].year,
    link: link ?? certificates[index].link,
  };

  res.json(certificates[index]);
});

// DELETE certificate
app.delete("/api/certificates/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = certificates.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Certificate not found" });
  }

  const removed = certificates[index];
  certificates = certificates.filter((c) => c.id !== id);
  res.json(removed);
});

/* =========================
   ✦ NEW: Articles API (CRUD)
   ========================= */

let articles = [
  {
    id: 1,
    title: "Bug Bounty Writeup: XSS to Account Takeover",
    date: "Nov 2025",
    tagline: "Real-world XSS on e‑commerce platform",
    excerpt:
      "Step-by-step writeup of finding, exploiting, and reporting a stored XSS leading to account takeover.",
    link: "",
  },
];

// GET all articles
app.get("/api/articles", (req, res) => {
  res.json(articles);
});

// ADD article
app.post("/api/articles", (req, res) => {
  const { title, date, tagline, excerpt, link } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newArticle = {
    id: articles.length ? articles[articles.length - 1].id + 1 : 1,
    title,
    date: date || "",
    tagline: tagline || "",
    excerpt: excerpt || "",
    link: link || "",
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// UPDATE article
app.put("/api/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  const { title, date, tagline, excerpt, link } = req.body;
  articles[index] = {
    ...articles[index],
    title: title ?? articles[index].title,
    date: date ?? articles[index].date,
    tagline: tagline ?? articles[index].tagline,
    excerpt: excerpt ?? articles[index].excerpt,
    link: link ?? articles[index].link,
  };

  res.json(articles[index]);
});

// DELETE article
app.delete("/api/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  const removed = articles[index];
  articles = articles.filter((a) => a.id !== id);
  res.json(removed);
});

/* =========================
   ✦ NEW: Activity API (CRUD)
   ========================= */

let activity = [
  {
    id: 1,
    date: "2025-11-24",
    title: "New article on API security",
    description:
      "Published a detailed article on API security topics.",
    type: "security",
  },
  {
    id: 2,
    date: "2025-11-20",
    title: "Portfolio v2 deployed",
    description:
      "Deployed new version with admin panel and activity timeline.",
    type: "development",
  },
];

// GET all activity items
app.get("/api/activity", (req, res) => {
  res.json(activity);
});

// ADD activity item
app.post("/api/activity", (req, res) => {
  const { date, title, description, type } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newItem = {
    id: activity.length ? activity[activity.length - 1].id + 1 : 1,
    date: date || "",
    title,
    description: description || "",
    type: type || "",
  };

  activity.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE activity item
app.put("/api/activity/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = activity.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Activity item not found" });
  }

  const { date, title, description, type } = req.body;
  activity[index] = {
    ...activity[index],
    date: date ?? activity[index].date,
    title: title ?? activity[index].title,
    description: description ?? activity[index].description,
    type: type ?? activity[index].type,
  };

  res.json(activity[index]);
});

// DELETE activity item
app.delete("/api/activity/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = activity.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Activity item not found" });
  }

  const removed = activity[index];
  activity = activity.filter((a) => a.id !== id);
  res.json(removed);
});

/* =========================
   ✦ NEW: About API (CRUD)
   ========================= */

let aboutItems = [
  {
    id: 1,
    title: "Who I am",
    body:
      "Based in India, working at the intersection of full‑stack development and offensive security. " +
      "Exploring bug bounty, CTF‑style labs, and real‑world projects to sharpen both coding and hacking skills.",
  },
  {
    id: 2,
    title: "How I work",
    body:
      "Prefer shipping secure, testable features over quick hacks. Comfortable moving from recon and " +
      "threat‑modeling to implementing fixes in the codebase using Python, JavaScript, and modern stacks.",
  },
  {
    id: 3,
    title: "What I'm looking for",
    body:
      "Open to roles and projects where I can audit existing web apps, harden APIs, and build secure " +
      "features end‑to‑end with clear, documented findings for teams.",
  },
];

// GET all about items
app.get("/api/about", (req, res) => {
  res.json(aboutItems);
});

// ADD about item
app.post("/api/about", (req, res) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newItem = {
    id: aboutItems.length ? aboutItems[aboutItems.length - 1].id + 1 : 1,
    title,
    body: body || "",
  };

  aboutItems.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE about item
app.put("/api/about/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = aboutItems.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "About item not found" });
  }

  const { title, body } = req.body;
  aboutItems[index] = {
    ...aboutItems[index],
    title: title ?? aboutItems[index].title,
    body: body ?? aboutItems[index].body,
  };

  res.json(aboutItems[index]);
});

// DELETE about item
app.delete("/api/about/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = aboutItems.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "About item not found" });
  }

  const removed = aboutItems[index];
  aboutItems = aboutItems.filter((a) => a.id !== id);
  res.json(removed);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
