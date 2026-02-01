// src/components/PlantWidget.js

"use client";

import { useState, useEffect } from "react";
import { getPlantStage, loadState } from "../utils/storage";

export default function PlantWidget() {
  const [plantData, setPlantData] = useState(null);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    const updatePlant = () => {
      const stage = getPlantStage();
      const state = loadState();
      setPlantData(stage);
      setGrowth(state?.plantGrowth || 0);
    };

    updatePlant();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      updatePlant();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes (since we're using same-tab storage)
    const interval = setInterval(updatePlant, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!plantData) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "clamp(0.4rem, 2vw, 0.6rem)",
      padding: "clamp(0.8rem, 3vw, 1rem) clamp(0.7rem, 2vw, 0.9rem)",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 2px 12px 0 rgba(180, 140, 100, 0.10)",
      border: "1px solid #f3e6d0",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif",
      minWidth: "clamp(120px, 25vw, 135px)",
      textAlign: "center"
    }}>
      <div style={{
        fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
        lineHeight: 1
      }}>
        {plantData.emoji}
      </div>
      <div style={{
        fontSize: "clamp(0.7rem, 2.5vw, 0.8rem)",
        color: "#a67c52",
        fontWeight: 600
      }}>
        {plantData.name}
      </div>
      <div style={{
        fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
        color: "#888a8c",
        lineHeight: "1.4"
      }}>
        {plantData.message}
      </div>
      <div style={{
        fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
        color: "#c7c7c7",
        borderTop: "1px solid #f3e6d0",
        paddingTop: "clamp(0.5rem, 2vw, 0.6rem)",
        width: "100%"
      }}>
        {plantData.isMax ? (
          "Max stage"
        ) : (
          `Next stage in ${plantData.nextIn} ${plantData.nextIn === 1 ? 'query' : 'queries'}`
        )}
      </div>
    </div>
  );
}
