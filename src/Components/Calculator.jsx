import { useState, useRef } from "react";
import Row from "./Row.jsx";

const Calculator = () => {
  const [rows, setRows] = useState([]);
  const rowId = useRef(1); // Unique IDs across renders

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: rowId.current++,
        value: "",
        sign: "+",
        enabled: true,
      },
    ]);
  };

  const removeRow = (id) => {
    const rowElement = document.querySelector(`[data-row-id="${id}"]`);
    if (rowElement) {
      rowElement.classList.add("removing");
      setTimeout(() => {
        setRows((prev) => prev.filter((row) => row.id !== id));
      }, 300);
    }
  };

  const updateRow = (id, changes) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...changes } : row))
    );
  };

  const total = rows.reduce((sum, row) => {
    if (!row.enabled || row.value === "") return sum;
    const val = parseFloat(row.value) || 0;
    return row.sign === "+" ? sum + val : sum - val;
  }, 0);

  return (
    <div className="app">
      <h1>React Calculator</h1>

      <div className="row-list">
        {rows.map((row) => (
          <Row
            key={row.id}
            {...row}
            onChange={(changes) => updateRow(row.id, changes)}
            onRemove={() => removeRow(row.id)}
          />
        ))}
      </div>

      <button onClick={addRow} className="add-btn">
        + Add Row
      </button>

      <div className="result">
        Total: <strong>{total}</strong>
      </div>
    </div>
  );
};

export default Calculator;
