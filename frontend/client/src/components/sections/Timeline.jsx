import React, { useEffect, useState } from "react";
import { fetchActivity } from "./activityTimeline";

const Timeline = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchActivity();
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setItems(sorted);
      } catch (err) {
        setError(
          typeof err?.message === "string"
            ? err.message
            : "Failed to load activity"
        );
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, []);

  return (
    <section className="section">
      <h2>Activity & Timeline</h2>
      <p className="resources-subtitle">
        Recent work, learning milestones, and portfolio updates.
      </p>

      {loading && <p className="status">Loading activity...</p>}
      {error && !loading && <p className="status">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="status">No activity yet. Stay tuned!</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="timeline">
          {items.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span>{item.date}</span>
                  {item.type && (
                    <span
                      className={
                        "timeline-type " +
                        (item.type === "security"
                          ? "timeline-type-security"
                          : item.type === "development"
                          ? "timeline-type-development"
                          : "")
                      }
                    >
                      {item.type}
                    </span>
                  )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Timeline;

