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
          accept="video/mp4"
          onDropRejected={handleDropRejected}
          // 1 Megabyte = 1048576 Bytes
          maxSize={52428800}
        >
          {({
            getRootProps, getInputProps, isDragActive, isDragReject,
          }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted, sorry!"}
              </p>
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
