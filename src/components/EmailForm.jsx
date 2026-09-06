import { useState } from "react";

export default function EmailForm({ onGenerate }) {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!recipient || !purpose || !keyPoints) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(""); // clear error
    setLoading(true);

    try {
      await onGenerate({ recipient, purpose, tone, keyPoints });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      {/* Tone dropdown */}
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Formal</option>
        <option>Friendly</option>
        <option>Casual</option>
      </select>

      {/* Tone presets */}
      <div className="tone-presets">
        {["Formal", "Friendly", "Persuasive"].map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => setTone(preset)}
            className="preset-btn"
          >
            {preset}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Key Points"
        value={keyPoints}
        onChange={(e) => setKeyPoints(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Loading spinner or button */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <button type="submit">Generate Email</button>
      )}
    </form>
  );
}
