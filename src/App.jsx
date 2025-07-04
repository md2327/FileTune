import { useState } from "react";
import styles from "./App.module.css";
import { Import } from "/src/components/Import/Import";
import { Progressbar } from "/src/components/Progressbar/Progressbar";

// parent component
function App() {
  // states variables (fileUploaded and textFilled)
  const [fileUploaded, setFileUploaded] = useState(false);
  const [textFilled, setTextFilled] = useState(false);

  const handleFileUpload = () => {
    setFileUploaded(true);
  }
  
  const handleTextFill = () => {
    setTextFilled(true);
  }

  return (
    <div className={styles.App}>
      <Import
        onFileUpload={handleFileUpload}  // pass as props
        onTextFill={handleTextFill}
      />
      <Progressbar
        fileUploaded={fileUploaded}  // pass as props
        textFilled={textFilled}
      />
    </div>
  );
}

export default App;
