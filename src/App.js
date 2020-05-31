import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./App.css";

function App() {
  const [fileName, setFileName] = useState();
  const [error, setError] = useState();

  const handleDrop = (acceptedFiles) => setFileName(
    acceptedFiles.map((file) => {
      setError("");
      return file.name;
    }),
  );

  const handleDropRejected = (fileRejections) => {
    setError(fileRejections?.[0].errors?.[0]?.message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Dropzone
          onDrop={handleDrop}
          accept="video/*"
          onDropRejected={handleDropRejected}
          maxSize={40000000}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag and drop files, or click to select files</p>
            </div>
          )}
        </Dropzone>
        <p>{fileName}</p>
        <p>{error}</p>
      </header>
    </div>
  );
}

export default App;
