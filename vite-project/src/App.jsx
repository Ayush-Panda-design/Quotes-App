import { useEffect, useState } from "react";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchQuotes = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes"
    );

    const json = await res.json();

    console.log("API RESPONSE:", json);

    if (!res.ok) {
      throw new Error(json.message || "Failed to fetch quotes");
    }

    // 🔥 IMPORTANT FIX
    const quotesData = json?.data?.data || [];

    setQuotes(quotesData);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1>📖 Quotes Gallery</h1>

      <button onClick={fetchQuotes} style={styles.button}>
        Refresh Quotes 🔄
      </button>

      {loading && <p>Loading quotes... ✨</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={styles.grid}>
        {quotes.map((quote, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.text}>
              “{quote?.content || quote?.text || "No quote"}”
            </p>

            <p style={styles.author}>
              — {quote?.author || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SIMPLE STYLES */
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 15px",
    margin: "15px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  text: {
    fontSize: "16px",
    fontStyle: "italic",
  },
  author: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};