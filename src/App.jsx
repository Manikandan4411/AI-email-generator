import { useState } from "react";
import EmailForm from "./components/EmailForm";
import EmailResult from "./components/EmailResult";
import { generateEmail } from "./services/aiService";

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("emailHistory") || "[]")
  );

  const handleGenerate = async (formData) => {
    const response = await generateEmail(formData);
    setResult(response);

    // Save to localStorage
    const updatedHistory = [
      ...history,
      { ...response, date: new Date().toLocaleString() },
    ];
    setHistory(updatedHistory);
    localStorage.setItem("emailHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    localStorage.removeItem("emailHistory");
    setHistory([]);
  };

  return (
    <div>
      <h1>AI Email Generator</h1>
      <EmailForm onGenerate={handleGenerate} />
      <EmailResult result={result} />

      {/* History Section */}
      {history.length > 0 && (
        <div className="history">
          <h2>Previous Emails</h2>
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="history-item">
                <h4>{item.subject}</h4>
                <p>{item.body}</p>
                <small>{item.date}</small>
              </div>
            ))}
          </div>
          <button onClick={clearHistory} className="copy-btn">
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
