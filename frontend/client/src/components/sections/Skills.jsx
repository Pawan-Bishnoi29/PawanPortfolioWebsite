import React, { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => {
        console.error("Failed to load skills", err);
      });
  }, []);

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="grid">
        {skills.map((group) => (
          <div key={group.id} className="card">
            <h3>{group.category}</h3>
            <div className="tags">
              {(group.items || []).map((item) => (
                <span key={item} className="tag-tech">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
