import Select from "@material-ui/core/Select";
import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import "./Grid.scss";

const Grid = ({ data: { header = [], values = [], actions = [] } }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const actionEffect = (action, row) => {
    action(row);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAction = (row, label, action, show) => {
    if (show) {
      return show(row) ? (
        <MenuItem key={label} onClick={() => actionEffect(action, row)}>
          {label}
        </MenuItem>
      ) : null;
    }
  };

  //   <button key={label} onClick={() => action(row)}>
  //   {label}
  // </button>

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
                <Button onClick={handleClick} className="gridActions--label">
                  ...
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {actions.map(({ label, action, show }) =>
                    renderAction(row, label, action, show)
                  )}
                </Menu>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
