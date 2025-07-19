import "../../vars.css";
import React, { useState, useContext } from "react";
import styles from "./Parser.module.css";
import { AccuracyContext } from "../../App";

// props
export const Parser = ({ fileStored, textStored, textContent }) => {
  const [isParsing, setIsParsing] = useState(false); // parse file and text
  const [parsedData, setParsedData] = useState(null); // store parsed results
  const [error, setError] = useState(null); // store any errors

  // function for api resume parsing
  const parseResume = async () => {    
    if (fileStored && textContent && textContent.trim() !== "") {
      setIsParsing(true);
      setError(null);
      
      try {
        /*
        const myHeaders = new Headers();
        myHeaders.append("apikey", "KB5e26dTPILQBnLXNvh6fT8AkBjxbNMS");
        myHeaders.append("Content-Type", "application/json");

        // For text parsing, use the text endpoint
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            text: textContent
          })
        };
        */
        // temp api testing
        const mockResult = {
          skills: ['javascript', 'react', 'node.js', 'python'],
          experiences: '5 years',
          education: 'Bachelor\'s Degree',
          summary: 'Experienced developer with strong technical skills'
        };
        /*
        const response = await fetch(
          "https://api.apilayer.com/resume_parser/text",
          requestOptions
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Response:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        */
       const result = mockResult;
        setParsedData(result);
        setAccuracyApi(true); // Mark that API has been used
        console.log("Parsed result:", result);
        
        // Calculate and set accuracy after successful parsing
        setTimeout(() => {
          handleAccuracyBar();
        }, 100);
      } catch (error) {
        console.log("error", error);
        setError(error.message);
      } finally {
        setIsParsing(false);
      }
    } else {
      if (!fileStored) {
        setError("Please upload a resume file");
      } else if (!textContent || textContent.trim() === "") {
        setError("Please provide a job description");
      } else {
        setError("Please ensure both file and text are provided");
      }
    }
  };

  // function for job description text parsing
  const parseText = (text) => {
    if (!text) return null;
    
    // convert to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // local database of resume keywords/skills
    const skills = [
      'javascript', 'react', 'node.js', 'python', 'java', 'html', 'css',
      'sql', 'mongodb', 'express', 'git', 'docker', 'aws', 'azure',
      'project management', 'leadership', 'communication', 'teamwork',
      'problem solving', 'analytical', 'creative', 'detail-oriented'
    ];
    
    // parse for matching skills
    const foundSkills = skills.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
    
    // parse for sentences
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);

    return {
      skills: foundSkills,
      sentences: sentences.slice(0, 5)
    };
  };

  const handleParse = () => {
    if (textContent && textContent.trim() !== "") {
      const parsed = parseText(textContent);
      setParsedData(parsed);
    }
  };

  const { setAccuracy, setAccuracyApi } = useContext(AccuracyContext);
  
  function handleAccuracyBar() {
    // Calculate accuracy based on parsed data
    if (parsedData && textContent) {
      // Simple accuracy calculation based on matching skills
      const parsedSkills = parsedData.skills || [];
      const textSkills = parseText(textContent)?.skills || [];
      
      // Calculate intersection of skills
      const matchingSkills = parsedSkills.filter(skill => 
        textSkills.some(textSkill => 
          textSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(textSkill.toLowerCase())
        )
      );
      
      // Calculate accuracy percentage
      const totalSkills = Math.max(parsedSkills.length, textSkills.length);
      const accuracyPercentage = totalSkills > 0 ? Math.round((matchingSkills.length / totalSkills) * 100) : 0;
      
      setAccuracy(accuracyPercentage);
    } else {
      setAccuracy(0);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Results:</h2>
        <h3 style={{ fontSize: "25px" }}>Matching Keywords:</h3>
        <div className={styles.keywords}>
          {textContent ? parseText(textContent)?.skills?.join(' ') : 'No results'}
        </div>
        <div className={styles.content}>
          <div className={styles.withApi}>
            <h3 style={{ fontSize: "25px", paddingBottom: "5px" }}>Scan with API for:</h3>
            <p style={{ padding: "5px" }}>% of Accuracy & ATS-Friendly Content</p>
            <p style={{ padding: "5px" }}>Note: there is a limit on API calls</p>
            <button 
              className={styles.withApiBtn}
              onClick={parseResume}
            >
              {isParsing ? 'Parsing...' : 'Parse with API'}
            </button>
          </div>
          <div className={styles.withoutApi}>
            <h3 style={{ fontSize: "25px" }}>Scan without API for:</h3>
            <p style={{ paddingBottom: "25px" }}>Matching skills and significant job details</p>
            <button
              className={styles.withoutApiBtn}
              onClick={handleParse}
            >
              Parse Without API
            </button>
          </div>
        </div>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}
      
      {parsedData && (
        <div className={styles.parsedData}>
          <h3 style={{ fontSize: "25px" }}>Parsed Results:</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
      <p style={{ textAlign: "center", color: "var(--color-textGrey)" }}>Scan Again</p>
      <button 
        className={styles.resetBtn}
        onClick={() => {
          setParsedData(null);
          setError(null);
          setAccuracy(undefined);
          setAccuracyApi(false);
        }}
      >
        Reset
      </button>
    </div>
  );
};

