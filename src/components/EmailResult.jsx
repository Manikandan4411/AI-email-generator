import { useState, useEffect } from "react";

export default function EmailResult({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    const fullEmail = `Subject: ${result.subject}\n\n${result.body}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // hide message after 2 seconds
  };

  // Save generated emails to localStorage (history)
  useEffect(() => {
    if (result?.subject && result?.body) {
      const history = JSON.parse(localStorage.getItem("emailHistory") || "[]");
      history.push({
        subject: result.subject,
        body: result.body,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("emailHistory", JSON.stringify(history));
    }
  }, [result]);

  if (!result) {
    return <p style={{ textAlign: "center" }}>No email generated yet.</p>;
  }

  return (
    <div className="result">
      <h3>Subject: {result.subject}</h3>
      <div className="email-body">
        {result.body.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <button onClick={handleCopy} className="copy-btn">
        Copy Email
      </button>
      {copied && <p style={{ color: "lime" }}>Copied!</p>}
    </div>
  );
}
