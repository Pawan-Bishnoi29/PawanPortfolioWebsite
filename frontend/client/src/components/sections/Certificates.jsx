import React, { useEffect, useState } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/certificates");
        const data = await res.json();
        setCerts(data);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="section">
      <h2>Certificates</h2>

      {loading ? (
        <p className="status">Loading certificates...</p>
      ) : certs.length === 0 ? (
        <p className="status">No certificates added yet.</p>
      ) : (
        <div className="grid">
          {certs.map((c) => (
            <div key={c.id} className="card">
              <h3>{c.title}</h3>
              <p>
                {c.org}
                {c.year ? ` • ${c.year}` : ""}
              </p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                >
                  View Credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Certificates;
