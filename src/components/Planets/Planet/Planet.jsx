import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Modal from "react-modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { promisifyAction } from "../../../utils";
import * as actionCreator from "../../../store/action-creator";
import ModalEditPlanet from "../../ModalEditPlanet";
import Grid from "../../Grid";

const Planet = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const history = useHistory();

  const getCurrentPlanetAsync = promisifyAction(
    dispatch,
    actionCreator.getCurrentPlanet
  );

  const { planet } = useSelector((state) => ({
    planet: state.planetReducer.planet,
  }));

  const [selectedPlanet, setSelectedPlanet] = useState(planet);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const snackState = useMemo(() => {
    return error ? "Error" : "Success";
  }, [error]);

  useEffect(() => {
    const getCurrentPlanet = async () => {
      await getCurrentPlanetAsync(id);
    };
    Modal.setAppElement("body");
    getCurrentPlanet();
  }, []);

  const closeModal = (isEdit) => {
    setIsOpenModal(false);
    if (isEdit) {
      setError(Math.random() <= 0.5);
      setIsOpenSnack(true);
    }
  };

  const openModal = () => {
    setSelectedPlanet(planet);
    setIsOpenModal(true);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnack(false);
  };

  const data = {
    header: [
      { label: "name", type: "string" },
      { label: "rotation_period", type: "number" },
      { label: "orbital_period", type: "number" },
      { label: "diameter", type: "number" },
      { label: "climate", type: "string" },
      { label: "gravity", type: "number" },
      { label: "terrain", type: "string" },
      { label: "surface_water", type: "number" },
      { label: "population", type: "number" },
      { label: "films", type: "array" },
      { label: "residents", type: "array" },
    ],
    values: [planet],
    actions: [
      {
        label: "Go to Films",
        show: (row) => row.films.length,
        action: (row) => history.push(`/planets/${row.id}/films/`),
      },
      {
        label: "Go to Residents",
        show: (row) => row.residents.length,
        action: (row) => history.push(`/planets/${row.id}/residents/`),
      },
      {
        label: "Edit",
        show: (row) => true,
        action: (row) => openModal(row),
      },
    ],
  };

  return (
    <div className="Planet">
      <Grid data={data} />
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        contentLabel="Test Modal"
      >
        <ModalEditPlanet
          closeModal={closeModal}
          planet={selectedPlanet}
          header={data.header}
          className="modal"
        />
      </Modal>
      <Snackbar
        open={isOpenSnack}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackState.toLowerCase()}>
          {snackState}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Planet;
