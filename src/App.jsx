import styles from "./App.module.css";
import { useState, createContext } from "react";
import { Import } from "/src/components/Import/Import";
import { Progressbar } from "/src/components/Progressbar/Progressbar";
import { Parser } from "/src/components/Parser/Parser";
import { Accuracybar } from "/src/components/Parser/Accuracybar";

export const AccuracyContext = createContext();

const AccuracyContextProvider = ({ children }) => {
  const [accuracy, setAccuracy] = useState(undefined);
  const [accuracyApi, setAccuracyApi] = useState(false);
  return (
    <AccuracyContext.Provider value={{ accuracy, setAccuracy, accuracyApi, setAccuracyApi}}>
      {children}
    </AccuracyContext.Provider>
  );
};

// parent component
function App() {
  // states variables (fileUploaded, textFilled, fileStored)
  const [fileUploaded, setFileUploaded] = useState(false);
  const [textFilled, setTextFilled] = useState(false);
  const [fileContent, setFileContent] = useState(false); // for resume parsing
  const [textContent, setTextContent] = useState(""); // for text parsing

  // to check before scanning
  const handleFileUpload = () => {
    setFileUploaded(true);
    setFileContent(true); // check that resume is stored/ready for parsing
  };
  
  // to check before scanning
  const handleTextFill = (text) => {
    setTextFilled(true);
    setTextContent(text); // store the actual text content
  };

  return (
    // pass as props
    <div className={styles.App}>
      <Import
        onFileUpload={handleFileUpload}
        onTextFill={handleTextFill}
      />
      <Progressbar
        fileUploaded={fileUploaded}
        textFilled={textFilled}
      />
      <AccuracyContextProvider>
        <Parser
          fileStored={fileContent}
          textStored={textFilled} // check if text content exist
          textContent={textContent}
        />
        <Accuracybar />
      </AccuracyContextProvider>
    </div>
  );
}

export default App;
