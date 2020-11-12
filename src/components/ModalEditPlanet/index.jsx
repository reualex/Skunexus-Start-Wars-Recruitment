import { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import "./style.scss";

const ModalEditPlanet = (props) => {
  const form = useRef(null);

  const { register, handleSubmit, errors } = useForm();

  const [planet, setPlanet] = useState(props.planet);
  const submitForm = (e) => {
    props.closeModal(true);
  };

  const handleIput = (event) => {
    const { name, value } = event.target;
    setPlanet({ ...planet, [name]: value });
  };

  return (
    <div className="modal-window">
      <form
        ref={form}
        className="edit-modal"
        onSubmit={handleSubmit(submitForm)}
      >
        <table className="gridTable">
          <tbody>
            {props.header.map((colName) => {
              return [planet].map((row, index) => (
                <tr key={index}>
                  <td className="edit-modal--label">{colName}</td>
                  <td className="edit-modal--input">
                    <input
                      onChange={handleIput}
                      name={colName}
                      value={row[colName]}
                      ref={register({
                        required: "is required",
                        maxLength: {
                          value: 20,
                          message:
                            "exceeds the maximum length of 20 characters",
                        },
                      })}
                    />
                    {errors[colName] && (
                      <div className="edit-modal--error">
                        {errors[colName].message}
                      </div>
                    )}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>

        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button color="secondary" onClick={() => props.closeModal(false)}>
          CloseModal
        </Button>
      </form>
    </div>
  );
};

export default ModalEditPlanet;
