
// src/app/page.tsx

import ExplainBox from "../components/ExplainBox";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Newcomer Helper (MVP)</h1>
      <ExplainBox />
    </main>
  );
}



 // "use client";

// import { useState } from "react";
// import vocab from '../data/vocab.json';

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");

//     const handleExplain = () => {
//     const text = input.trim().toLowerCase();

//     const match = (vocab as any[]).find(
//       (item) => item.term.toLowerCase() === text
//     );

//     if (match) {
//       setResult(match.fallback_explanation);
//     } else {
//       setResult("No match in vocab yet.");
//     }
//   };


//   return (
//     <main style={{ padding: "2rem" }}>
//       <h1>Newcomer Helper (MVP)</h1>

//       <input
//         type="text"
//         placeholder="Enter text you see"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "0.5rem",
//           marginTop: "1rem",
//           border: "1px solid #ccc",
//         }}
//       />

//       <button
//         onClick={handleExplain}

//         style={{
//           marginTop: "1rem",
//           padding: "0.5rem 1rem",
//           border: "1px solid #333",
//         }}
//       >
//         Explain
//       </button>

//       {result && (
//         <p style={{ marginTop: "1rem" }}>
//           You entered: <strong>{result}</strong>
//         </p>
//       )}
//     </main>
//   );
// }
