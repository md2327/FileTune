import "../../vars.css";
import React, { useState, useEffect } from "react";
import styles from "./Progressbar.module.css";

// fileUploaded and textFilled are props here
export const Progressbar = ({ fileUploaded, textFilled }) => {
  const [progress, setProgress] = useState(0); // progress being filled, set to 0 bc currently empty
  const [isLoading, setIsLoading] = useState(false); // loads progress bar

  // check if resume is uploaded and job description is filled
  const checkRequirements = () => {
    if (fileUploaded && textFilled) {
      setIsLoading(true); // if true, send signal to start scan
    } else {
      alert("Please upload a resume and fill in the job description"); // error handling
    }
  };

  // progress bar animation
  useEffect(() => {
    if (progress < 100 && isLoading) {
      setTimeout(() => setProgress((prev) => prev + 1), 70);
    }
  }, [progress, isLoading]);

  // progress bar color based on progress
  const progressColor = () => {
    if (progress === 0) {
      return "darkgray"; // grey at 0%
    } else if (progress > 0 && progress <= 20) {
      return "#ff0000"; // red at <20
    } else if (progress > 20 && progress <= 50) {
      return "#ffd700"; // yellow <50
    } else {
      return "var(--color-btn)"; // green at >50
    }
  };

  return (
    <section>
      <div className={styles.scanContent}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              backgroundColor: progressColor(),
            }}
          >
            {progress}%
          </div>
        </div>
        <button className={styles.scanBtn} onClick={checkRequirements}>
          Begin Scan
        </button>
      </div>
    </section>
  );
};
