import { useState, useRef } from "react";
import Row from "./RowComponent/Row";
import "./App.css";

const App = () => {
  const [rows, setRows] = useState([]);
  // Persistent Id between re-renders
  const rowId = useRef(1);

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
    setRows((prev) => prev.filter((row) => row.id !== id));
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
      <h1>React Adder Calculator</h1>
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

export default App;
