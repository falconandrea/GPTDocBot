import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setErrorMessage("");

    if (acceptedFiles.length != 1) {
      setErrorMessage("Please upload only one file");
      return;
    }

    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a PDF");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/addFile", {
        method: "POST",
        body: formData,
      });

      const body = await response.json();

      if (!body.success) {
        setErrorMessage("Error during uploading file");
      }
    } catch (err) {
      setErrorMessage("Error during uploading file");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-4 mb-4 text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag and drop the file here, or click to select the file</p>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
