import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="articles" className="section">
      <h2>Articles & Writeups</h2>

      {loading ? (
        <p className="status">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="status">No articles added yet.</p>
      ) : (
        <div className="grid">
          {articles.map((a) => (
            <div key={a.id} className="card">
              <h3>{a.title}</h3>
              {(a.date || a.tagline) && (
                <p style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {a.date}
                  {a.tagline ? ` • ${a.tagline}` : ""}
                </p>
              )}
              {a.excerpt && <p>{a.excerpt}</p>}
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                >
                  Read Full Article
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Articles;


