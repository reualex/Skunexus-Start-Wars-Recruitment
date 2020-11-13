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
            {props.header.map((obj) => {
              return [planet].map((row, index) => {
                if (obj.type !== "array") {
                  return (
                    <tr key={index}>
                      <td className="edit-modal--label">{obj.label}</td>
                      <td className="edit-modal--input">
                        <input
                          onChange={handleIput}
                          name={obj.label}
                          value={row[obj.label]}
                          ref={register({
                            required: "is required",
                            maxLength: {
                              value: 20,
                              message:
                                "exceeds the maximum length of 20 characters",
                            },
                          })}
                        />
                        {errors[obj.label] && (
                          <div className="edit-modal--error">
                            {errors[obj.label].message}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
              });
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
