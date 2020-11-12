import { useState } from "react";

import "./style.scss";

const ModalEditPlanet = (props) => {
  const [planet, setPlanet] = useState(props.planet);

  const submitForm = (e) => {
    e.preventDefault();
    props.closeModal(true);
  };

  const handleIput = (event) => {
    const { name, value } = event.target;
    setPlanet({ ...planet, [name]: value });
  };

  return (
    <div className="modal-window">
      <form method="put" className="edit-modal">
        <table className="gridTable">
          <tbody>
            {props.header.map((colName) => {
              return [planet].map((row, index) => (
                <tr key={index}>
                  <td>{colName}</td>
                  <td>
                    <input
                      type="text"
                      name={colName}
                      value={row[colName]}
                      onChange={handleIput}
                    />
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>

        <button type="submit" onClick={submitForm}>
          Edit
        </button>
      </form>

      <button
        className="modal-window--close-modal"
        onClick={() => props.closeModal(false)}
      >
        CloseModal
      </button>
    </div>
  );
};

export default ModalEditPlanet;
