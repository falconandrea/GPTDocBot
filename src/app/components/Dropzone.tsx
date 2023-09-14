import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({
  setPdfFile,
}: {
  setPdfFile: (file: string | null) => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

    setLoading(true);
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/addFile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setErrorMessage("Error during uploading file");
      setLoading(false);
      return;
    }
    await response.json();
    setLoading(false);
    setPdfFile(file.name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {loading ? (
        <div className="border-dashed border-2 border-gray-300 p-4 mb-4 text-center">
          Loading...
        </div>
      ) : (
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
      )}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
