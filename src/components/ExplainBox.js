// src/components/ExplainBox.js

"use client";

import { useState } from "react";
import { addToReview, awardCoins } from "../utils/storage";


export default function ExplainBox() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const handleExplain = async () => {
    const text = inputText.trim();
    if (!text) return;

    setExplanation("Thinking...");
    setError("");

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setExplanation("");
        return;
      }

      setExplanation(data.explanation || "No explanation.");

      if (data.explanation) {
        addToReview(text);
        awardCoins(1);
      }
    } catch (err) {
      setError(err.message);
      setExplanation("");
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste English here"
      />
      <button onClick={handleExplain}>Explain</button>

      {explanation && <p>{explanation}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
