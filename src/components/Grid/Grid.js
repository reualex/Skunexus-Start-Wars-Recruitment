import { useState } from "react";
import { ToggleLayer, anchor } from "react-laag";

import "./Grid.css";

const Grid = ({ data: { header = [], values = [], actions = [] } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderAction = (row, label, action, show) => {
    if (show) {
      return show(row) ? (
        <button onClick={() => action(row)}>{label}</button>
      ) : null;
    }
  };

  const toggleDropMenu = (index) => {
    let id = setIsOpen(!isOpen);
  };
  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName}>{colName}</th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map((colName) => (
              <td key={colName}>{row[colName]}</td>
            ))}
            {!!actions.length && (
              <td key={index} className="gridActions">
                {actions.map(({ label, action, show }) => (
                  <button onClick={() => action(row)}>{label}</button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
