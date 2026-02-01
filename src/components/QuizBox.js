// src/components/QuizBox.js
"use client";

import { useEffect, useState } from "react";

export default function QuizBox() {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("latestQuiz");
    if (raw) setQuiz(JSON.parse(raw));
  }, []);

  if (!quiz) {
    return <p>No quiz found. Go back and generate one.</p>;
  }

  const submit = () => {
    if (!selected) return;

    if (selected === quiz.correctAnswer) {
      setFeedback("✅ Correct!");
    } else {
        setFeedback(
        <>
            <div>❌ Wrong.</div>
            <div>Correct answer: {quiz.correctAnswer}</div>
        </>
        );
    }
  };

  return (
    <div>
      <p><strong>{quiz.question}</strong></p>

      {quiz.options.map((opt, idx) => {
        const letter = ["A", "B", "C", "D"][idx];
        return (
          <label key={letter} style={{ display: "block" }}>
            <input
              type="radio"
              name="quiz"
              value={letter}
              checked={selected === letter}
              onChange={(e) => setSelected(e.target.value)}
            />
            {" "}{letter}. {opt.replace(/^[A-D]\.\s*/, "")}
          </label>
        );
      })}

      <button onClick={submit} style={{ marginTop: 10 }}>
        Submit
      </button>

      {feedback && <p>{feedback}</p>}
    </div>
  );
}
