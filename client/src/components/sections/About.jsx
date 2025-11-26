import React from "react";

const DEFAULT_ABOUT_ITEMS = [
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

const About = ({ items = DEFAULT_ABOUT_ITEMS }) => {
  return (
    <section className="section about">
      <div className="about-inner">
        <h2>About Me</h2>
        <p className="about-intro">
          Python full‑stack developer and security enthusiast focused on
          securing modern web applications, APIs, and infrastructure.
        </p>

        <div className="about-grid">
          {items.map((item) => (
            <div key={item.id} className="about-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
