import Button from "@material-ui/core/Button";

import "./Grid.scss";

const Grid = ({ data: { header = [], values = [], actions = [] } }) => {
  const renderAction = (row, label, action, show) => {
    if (show) {
      return show(row) ? (
        <Button key={label} onClick={() => action(row)} color="primary">
          {label}
        </Button>
      ) : null;
    }
  };

  const renderColumn = (row, obj) => {
    if (obj.type === "number") {
      return (
        <td style={{ textAlign: "right" }} key={obj.label}>
          {row[obj.label]}
        </td>
      );
    } else if (obj.type === "array") {
      return (
        <td style={{ textAlign: "right" }} key={obj.label}>
          {row[obj.label].length}
        </td>
      );
    } else return <td key={obj.label}>{row[obj.label]}</td>;
  };

  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((obj) => (
            <th key={obj.label}>{obj.label}</th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map((obj) => renderColumn(row, obj))}
            {!!actions.length && (
              <td key={index} className="gridActions">
                {actions.map(({ label, action, show }) =>
                  renderAction(row, label, action, show)
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
