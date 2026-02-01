// src/app/page.tsx

import ExplainBox from "../components/ExplainBox";
import PlantWidget from "../components/PlantWidget";

export default function Home() {
  return (
    <main style={{
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4vw 2vw",
      background: "#f8f5ee"
    }}>
      <div style={{
        maxWidth: "780px",
        width: "100%",
        background: "#fff",
        borderRadius: "32px",
        boxShadow: "0 2px 12px 0 rgba(180, 140, 100, 0.07)",
        padding: "clamp(1.5rem, 5vw, 2.8rem) clamp(1.5rem, 5vw, 4rem)",
        border: "none",
        margin: "0 auto"
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "clamp(1.5rem, 3vw, 2rem)",
          fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
          color: "#181818",
          fontWeight: 800,
          letterSpacing: "0.04em"
        }}>ClearHere</h1>
        <ExplainBox />
      </div>
      <PlantWidget />
    </main>
  );
}
