import { useState, Suspense } from "react";
import Viewer3D from "./components/Viewer3D";
import Controls from "./components/Controls";
import FileUpload from "./components/FileUpload";
import { uploadModel, saveSettings, getSettings } from "./services/api";
import "./App.css";

function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a");
  const [wireframe, setWireframe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg, type = "info") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 4000);
  };

  const handleFileSelect = async (file) => {
    try {
      setLoading(true);
      showMessage("🚀 Uploading your 3D model...", "info");
      const response = await uploadModel(file);
      setModelUrl(response.url);
      showMessage("✨ Model uploaded successfully!", "success");
    } catch (error) {
      showMessage("❌ Error uploading model: " + error.message, "error");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings({
        backgroundColor,
        wireframeMode: wireframe,
        modelUrl,
      });
      showMessage("💾 Settings saved successfully!", "success");
    } catch (error) {
      showMessage("❌ Error saving settings: " + error.message, "error");
      console.error("Save error:", error);
    }
  };

  const handleLoadSettings = async () => {
    try {
      const settings = await getSettings();
      if (settings && settings.backgroundColor) {
        setBackgroundColor(settings.backgroundColor);
        setWireframe(settings.wireframeMode || false);
        if (settings.modelUrl) {
          setModelUrl(settings.modelUrl);
        }
        showMessage("📥 Settings loaded successfully!", "success");
      } else {
        showMessage("ℹ️ No saved settings found", "info");
      }
    } catch (error) {
      showMessage("❌ Error loading settings: " + error.message, "error");
      console.error("Load error:", error);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🎨 3D Product Viewer</h1>
        <p>Upload, Customize & Explore Your 3D Models</p>
      </header>

      {/* Message Notifications */}
      {message && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}

      {/* File Upload Section */}
      <FileUpload onFileSelect={handleFileSelect} loading={loading} />

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Uploading your amazing 3D model...</p>
        </div>
      )}

      {/* Main Content - Only show when model is loaded */}
      {modelUrl && !loading && (
        <>
          {/* Control Panel */}
          <Controls
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            wireframe={wireframe}
            setWireframe={setWireframe}
            onSave={handleSaveSettings}
            onLoad={handleLoadSettings}
          />

          {/* 3D Viewer */}
          <div className="viewer-container">
            <Suspense
              fallback={
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading your 3D model...</p>
                </div>
              }
            >
              <Viewer3D
                modelUrl={modelUrl}
                backgroundColor={backgroundColor}
                wireframe={wireframe}
              />
            </Suspense>
          </div>

          {/* Instructions */}
          <div className="instructions">
            <h3>🎮 Interactive Controls</h3>
            <ul>
              <li>
                <strong>🖱️ Rotate:</strong> Left click and drag to rotate the
                model in any direction
              </li>
              <li>
                <strong>✋ Pan:</strong> Right click and drag to move the model
                around the canvas
              </li>
              <li>
                <strong>🔍 Zoom:</strong> Use your mouse wheel to zoom in and
                out for detailed views
              </li>
              <li>
                <strong>🎨 Customize:</strong> Change colors and toggle
                wireframe mode above
              </li>
              <li>
                <strong>💾 Save:</strong> Save your favorite settings for quick
                access later
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Empty State - Show when no model is loaded */}
      {!modelUrl && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>Ready to Start?</h2>
          <p>Upload a 3D model (.glb or .gltf format) to begin your journey</p>
          <p style={{ fontSize: "1rem", marginTop: "20px", opacity: 0.8 }}>
            Don't have a model? Download free samples from
            <br />
            <a
              href="https://github.com/KhronosGroup/glTF-Sample-Models"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              GitHub Sample Models
            </a>
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Built with ❤️ using React • Three.js • MERN Stack</p>
        <p style={{ fontSize: "0.9rem", marginTop: "10px", opacity: 0.7 }}>
          Powering immersive 3D experiences on the web
        </p>
      </footer>
    </div>
  );
}

export default App;
