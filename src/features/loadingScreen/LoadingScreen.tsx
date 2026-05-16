import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./LoadingScreen.css";

function LoadingScreen() {
  const { progress, item } = useProgress();
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (item) {
      const filename = item.split("/").pop() ?? item;
      setLog((prev) => [...prev.slice(-4), filename]);
    }
  }, [item]);

  return (
    <Html fullscreen>
      <div className="loading-screen">
        <div className="loading-content">
          <h1 className="loading-title">
            7Clickers <span>Showroom 3D</span>
          </h1>

          <div className="loading-bar-wrapper">
            <div className="loading-bar-track">
              <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="loading-percentage">{Math.round(progress)}%</span>
          </div>

          <div className="loading-log">
            {log.map((entry, i) => (
              <div
                key={i}
                className={`log-entry ${i === log.length - 1 ? "active" : "done"}`}
              >
                <span className="log-arrow">▸</span>
                <span className="log-filename">{entry}</span>
                {i < log.length - 1 && <span className="log-check">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Html>
  );
}

export default LoadingScreen;
