import React, { useState } from "react";
import styles from "./Import.module.css";

// onFileUpload and onTextFill are props here
export const Import = ({ onFileUpload, onTextFill }) => {
  // js for drag and drop feature
  const [fileUploaded, setFileUploaded] = useState(null);
  const [textFilled, setTextFilled] = useState(null);
  
  // allows file drop
  const handleDrop = (e) => {
    e.preventDefault(); // prevents opening file
    const file = e.dataTransfer.files[0];
    if (
      (file && file.type === "application/pdf") ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileUploaded(true);
      onFileUpload(); // notify parent component once file uploads
    } else {
      alert("PDF or DOCX files only."); // error handling
    }
  };

  // allows file drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // allows change in files
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFileUploaded(true);
      onFileUpload(); // notify parent component once file uploads
    } else {
      alert("PDF or DOCX files only."); // error handling
    }
  };

  // text area for job description
  const handleTextArea = (e) => {
    if (e.target.value.trim() !== "") {
    setTextFilled(true);
    onTextFill(); // notify parent component once text fills
  }
  };

  return (
    <section>
      <h1 className={styles.title}>Resume Scanner</h1>
      <div className={styles.description}>
        Import your resume to be parsed for ATS-friendly content
      </div>
      <div className={styles.container}>
        <label
          htmlFor="input-file"
          className={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            id="input-file" // click to upload
            onChange={handleFileChange}
            hidden
          />
          <div className={styles.fileView}>
            <img
              src="public/assets/Intro/downloadIcon.png"
              alt="Download icon"
            />
            {!fileUploaded ? (
              <p>Drop Files Here or Click to Upload</p>
            ) : (
              <p>Successful File Upload</p>
            )}
          </div>
        </label>
      </div>
      <div className={styles.textContainer}>
        <textarea
            name="text"
            placeholder="Paste Your Job Description Here"
            className={styles.textArea}
            onChange={handleTextArea}
            required
        />
      </div>
    </section>
  );
};
