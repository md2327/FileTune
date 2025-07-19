import React, { useContext } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AccuracyContext } from "../../App";
import styles from "./Accuracybar.module.css";

export const Accuracybar = () => {
  const { accuracy, accuracyApi } = useContext(AccuracyContext);
  
  // Only show the component if API has been used and accuracy is not undefined
  if (!accuracyApi || accuracy === undefined) {
    return null;
  }

  const percentage = accuracy || 0;

  return (
    <div className={styles.accuracyContainer}>
      <div>
        <h3 className={styles.accuracyTitle}>Resume-Job Match Accuracy</h3>
        <div style={{ width: 200, margin: '0 auto' }}>
          <CircularProgressbarWithChildren
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          >
            <div
              style={{
                fontSize: 12,
                marginTop: -5
              }}>
              <strong>{percentage}% accuracy</strong>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
};