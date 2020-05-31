import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const maxSize = 52428800;
  const [fileName, setFileName] = useState();
  const [error, setError] = useState();

  const onDropRejected = (fileRejections) => {
    setError(fileRejections?.[0].errors?.[0]?.message);
  };

  const onDrop = useCallback((acceptedFiles) => {
    resetFields();
    acceptedFiles.forEach((file) => {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
        // TODO handle bindary string
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected,
    accept: "video/mp4",
    minSize: 0,
    maxSize,
  });

  const resetFields = () => {
    setError("");
    setFileName("");
  };

  return (
    <div className="App">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          {!isDragActive && "Click here or drop a file to upload!"}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
        </p>
      </div>
      <p>{fileName}</p>
      <p>{error}</p>
    </div>
  );
}

export default App;
