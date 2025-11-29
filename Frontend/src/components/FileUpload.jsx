import { useState } from "react";
import "./FileUpload.css";

function FileUpload({ onFileSelect, loading }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-label" htmlFor="file-input">
        <div className="upload-content">
          <span className="upload-icon">📁</span>
          <span className="upload-text">
            {fileName ? fileName : "Choose 3D Model"}
          </span>
          <span className="upload-hint">(.glb or .gltf files)</span>
        </div>
        <input
          id="file-input"
          type="file"
          accept=".glb,.gltf"
          onChange={handleFileChange}
          disabled={loading}
          style={{ display: "none" }}
        />
      </label>

      {fileName && (
        <div className="file-info">
          ✅ Selected: <strong>{fileName}</strong>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
