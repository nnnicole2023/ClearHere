// src/components/ExplainBox.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExplainBox() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [hasQuiz, setHasQuiz] = useState(false);
  const router = useRouter();

  const handleExplain = async () => {
    const text = inputText.trim();
    if (!text) return;

    setExplanation("Thinking...");
    setHasQuiz(false);

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    setExplanation(data.explanation || "No explanation.");

    if (data.quiz?.question) {
      localStorage.setItem(
        "latestQuiz",
        JSON.stringify({ term: text, ...data.quiz })
      );
      setHasQuiz(true);
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

      {hasQuiz && (
        <button onClick={() => router.push("/quiz")}>
          Go to Quiz
        </button>
      )}
    </div>
  );
}
