import { useHistory, useLocation } from "react-router-dom";

import "./style.scss";

const Header = (props) => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push(`/`);
  };
  return (
    <div className="header">
      <h1 className="header--title">Star Wars Planets</h1>
      {location.pathname === "/" ? (
        ""
      ) : (
        <button className="header--btn" onClick={handleClick}>
          Main page
        </button>
      )}
    </div>
  );
};

export default Header;
