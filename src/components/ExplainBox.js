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
    <>
      <style>{`
        input::placeholder { color: #c7c7c7 !important; opacity: 1; }
        .explain-btn { transition: background 0.1s, box-shadow 0.1s, transform 0.1s; }
        .explain-btn:hover { background: #232323 !important; }
        .explain-btn:active { background: #232323 !important; transform: translateY(2px); box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04) !important; }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste English here"
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1.05rem",
          border: "1.5px solid #ede3d1",
          borderRadius: "18px",
          background: "#fff",
          color: "#7c5c3e",
          fontFamily: "inherit",
          outline: "none",
          boxShadow: "none",
          transition: "border-color 0.3s"
        }}
        onFocus={(e) => e.target.style.borderColor = "#d1bfa3"}
        onBlur={(e) => e.target.style.borderColor = "#ede3d1"}
      />
      
      <button 
        className="explain-btn"
        onClick={handleExplain}
        style={{
          width: "100%",
          maxWidth: "320px",
          margin: "0 auto",
          display: "block",
          padding: "1rem 0",
          fontSize: "1.08rem",
          fontWeight: 500,
          background: "#181818",
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
          cursor: "pointer",
          letterSpacing: "0.02em"
        }}
      >
        Explain
      </button>

      {explanation && (
        <div style={{
          padding: "1.1rem 1rem",
          background: "#fff",
          border: "none",
          borderRadius: "18px",
          color: "#404040",
          fontSize: "1.08rem",
          lineHeight: "1.7",
          marginTop: "0.5rem",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif",
          boxShadow: "0 1px 6px 0 rgba(180, 140, 100, 0.06)"
        }}>
          {explanation}
        </div>
      )}
      
      {error && (
        <div style={{
          padding: "1.1rem 1rem",
          background: "#fff0f0",
          border: "none",
          borderRadius: "18px",
          color: "#b85c5c",
          fontSize: "1.08rem",
          lineHeight: "1.7",
          marginTop: "0.5rem"
        }}>
          {error}
        </div>
      )}
      </div>
    </>
  );
}
