const Row = ({ value, sign, enabled, onChange, onRemove }) => {
  return (
    <div className={`row ${!enabled ? "disabled" : ""}`}>
      <select
        value={sign}
        onChange={(e) => onChange({ sign: e.target.value })}
        disabled={!enabled}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange({ value: e.target.value })}
        disabled={!enabled}
      />
      <button onClick={() => onChange({ enabled: !enabled })}>
        {enabled ? "Disable" : "Enable"}
      </button>
      <button onClick={onRemove} className="remove-btn">
        ✕
      </button>
    </div>
  );
};

export default Row;
