// src/components/ExplainBox.js

"use client";

import { useState } from "react";
import { addToReview, awardCoins, growPlant } from "../utils/storage";


export default function ExplainBox() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

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
        growPlant();
      }
    } catch (err) {
      setError(err.message);
      setExplanation("");
      console.error("Error:", err);
    }
  };

  const handleSpeak = async () => {
    if (!explanation || isPlaying) return;
    
    setIsPlaying(true);
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: explanation }),
      });

      if (!res.ok) {
        throw new Error(`TTS error: ${res.status}`);
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    } catch (err) {
      console.error("TTS Error:", err);
      setIsPlaying(false);
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
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 1.8rem)" }}>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste English here"
        style={{
          width: "100%",
          padding: "clamp(0.75rem, 2vw, 1.5rem)",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
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
          maxWidth: "480px",
          margin: "0 auto",
          display: "block",
          padding: "clamp(0.75rem, 2vw, 1.5rem) 0",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
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
        <div style={{ display: "flex", gap: "clamp(0.75rem, 2vw, 1rem)", alignItems: "center", marginTop: "clamp(0.5rem, 2vw, 0.75rem)" }}>
          <button
            onClick={handleSpeak}
            disabled={isPlaying}
            style={{
              padding: "clamp(0.75rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.2rem)",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              background: isPlaying ? "#d4a574" : "#d4a574",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              cursor: isPlaying ? "default" : "pointer",
              opacity: isPlaying ? 0.7 : 1,
              transition: "all 0.2s",
              fontWeight: 500,
              flexShrink: 0,
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => !isPlaying && (e.target.style.background = "#c39764")}
            onMouseLeave={(e) => !isPlaying && (e.target.style.background = "#d4a574")}
          >
            {isPlaying ? "🔊" : "🔊"}
          </button>
          <div style={{
            padding: "clamp(1rem, 2.5vw, 1.65rem)",
            background: "#fff",
            border: "none",
            borderRadius: "18px",
            color: "#2c2c2c",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            lineHeight: "1.7",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif",
            boxShadow: "0 1px 6px 0 rgba(180, 140, 100, 0.06)",
            flex: 1
          }}>
            {explanation}
          </div>
        </div>
      )}
      
      {error && (
        <div style={{
          padding: "clamp(1rem, 2.5vw, 1.65rem)",
          background: "#fff0f0",
          border: "none",
          borderRadius: "18px",
          color: "#b85c5c",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          lineHeight: "1.7",
          marginTop: "clamp(0.5rem, 2vw, 0.75rem)"
        }}>
          {error}
        </div>
      )}
      </div>
    </>
  );
}
