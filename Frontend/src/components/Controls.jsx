import "./Controls.css";

function Controls({
  backgroundColor,
  setBackgroundColor,
  wireframe,
  setWireframe,
  onSave,
  onLoad,
}) {
  return (
    <div className="controls-container">
      <div className="control-group">
        <label htmlFor="bg-color">
          <span className="label-icon">🎨</span>
          Background Color
        </label>
        <input
          id="bg-color"
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="color-picker"
        />
        <span className="color-value">{backgroundColor}</span>
      </div>

      <div className="control-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={wireframe}
            onChange={(e) => setWireframe(e.target.checked)}
            className="checkbox"
          />
          <span className="label-icon">🔲</span>
          Wireframe Mode
        </label>
      </div>

      <div className="button-group">
        <button onClick={onSave} className="btn btn-primary">
          💾 Save Settings
        </button>

        <button onClick={onLoad} className="btn btn-secondary">
          📥 Load Settings
        </button>
      </div>
    </div>
  );
}

export default Controls;
