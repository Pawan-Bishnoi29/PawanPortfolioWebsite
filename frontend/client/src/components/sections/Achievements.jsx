import React, { useEffect, useState } from "react";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        console.error("Failed to fetch achievements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="section">
      <h2>Achievements & Bug Bounty</h2>

      {loading ? (
        <p className="status">Loading achievements...</p>
      ) : achievements.length === 0 ? (
        <p className="status">No achievements added yet.</p>
      ) : (
        <div className="grid">
          {achievements.map((a) => (
            <div key={a.id} className="card">
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Achievements;
