import "./Grid.scss";
import DropDownMenuActions from "./DropDownMenu";

const Grid = ({ data: { header = [], values = [], actions = [] } }) => {
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
          {row[obj.label] ? row[obj.label].length : 0}
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
                <DropDownMenuActions actions={actions} row={row} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
