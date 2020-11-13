import Button from "@material-ui/core/Button";
import { useState } from "react";

import "./style.scss";

const DropDownMenuActions = (props) => {
  const [show, setShow] = useState(false);

  const renderAction = (row, label, action, show) => {
    if (show) {
      return show(row) ? (
        <Button
          className="action"
          key={label}
          onClick={() => action(row)}
          color="primary"
        >
          {label}
        </Button>
      ) : null;
    }
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  const closeMenu = () => {
    setTimeout(() => setShow(false), 300);
  };

  return (
    <div className="actions">
      <Button
        className="actions--drop-menu-btn"
        onClick={toggleMenu}
        onBlur={closeMenu}
      >
        ...
      </Button>
      {show && (
        <div className="actions--drop-menu">
          {props.actions.map(({ label, action, show }) =>
            renderAction(props.row, label, action, show)
          )}
        </div>
      )}
    </div>
  );
};

export default DropDownMenuActions;
