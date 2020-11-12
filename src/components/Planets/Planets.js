import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Grid from "../Grid";
import { promisifyAction } from "../../utils";
import * as actionCreator from "../../store/action-creator";
import ModalEditPlanet from "../ModalEditPlanet";

import "./Planets.css";

const Planets = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getPlanetsAsync = promisifyAction(dispatch, actionCreator.getPlanets);

  const { planets, planet } = useSelector((state) => ({
    planet: state.planetReducer.planet,
    planets: state.planetReducer.planets,
  }));

  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState({});
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const snackState = useMemo(() => {
    return error ? "Error" : "Success";
  });

  useEffect(() => {
    const getPlanets = async () => {
      await getPlanetsAsync(page);
    };
    Modal.setAppElement("body");
    getPlanets();
  }, []);

  const closeModal = (isEdit) => {
    setIsOpenModal(false);
    if (isEdit) {
      setError(Math.random() <= 0.5);
      setIsOpenSnack(true);
    }
  };
  const openModal = (data) => {
    setSelectedPlanet(data);
    setIsOpenModal(true);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnack(false);
  };

  const data = {
    header: [
      "name",
      "rotation_period",
      "orbital_period",
      "diameter",
      "climate",
      "gravity",
      "terrain",
      "surface_water",
      "population",
    ],
    values: planets,
    actions: [
      {
        label: "Go to Films",
        show: (row) => row.films.length,
        action: (row) => history.push(`planets/${row.id}/films/`),
      },
      {
        label: "Go to Residents",
        show: (row) => row.residents.length,
        action: (row) => history.push(`planets/${row.id}/residents/`),
      },
      {
        label: "Go to Planet",
        show: (row) => true,
        action: (row) => history.push(`planets/${row.id}`),
      },
      {
        label: "Edit",
        show: (row) => true,
        action: (row) => openModal(row),
      },
    ],
  };

  return (
    <div className="Planets">
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

export default Planets;
