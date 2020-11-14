import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Grid from "../Grid";
import { promisifyAction } from "../../utils";
import * as actionCreator from "../../store/action-creator";
import ModalEditPlanet from "../ModalEditPlanet";

import "./Planets.scss";

const Planets = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getPlanetsAsync = promisifyAction(dispatch, actionCreator.getPlanets);

  const { planets, planet, count } = useSelector((state) => ({
    planet: state.planetReducer.planet,
    planets: state.planetReducer.planets,
    count: state.planetReducer.total,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState({});
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const maxPage = Math.ceil(count / planets.length);

  const snackState = useMemo(() => {
    return error ? "Error" : "Success";
  });

  useEffect(() => {
    const getPlanets = async () => {
      await getPlanetsAsync(currentPage);
    };
    Modal.setAppElement("body");
    getPlanets();
  }, [currentPage]);

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

  const goToFilm = (row) => {
    history.push(`planets/${row.id}/films/`);
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
    values: planets,
    actions: [
      {
        label: "Go to Films",
        show: (row) => row.films.length,
        action: (row) => goToFilm(row),
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

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= maxPage; i++) {
      pages += i;
    }
    return pages.split("").map((el) => {
      let page = parseInt(el);
      return (
        <div
          className={`pagination-block--link-paginate ${
            currentPage === page ? "selected" : "sel"
          }`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      );
    });
  };

  const nextCurrentpage = () => {
    if (currentPage == maxPage) {
      setCurrentPage(1);
    } else setCurrentPage(currentPage + 1);
  };

  const prevCurrentpage = () => {
    if (currentPage == 1) {
      setCurrentPage(maxPage);
    } else setCurrentPage(currentPage - 1);
  };

  return (
    <div className="Planets">
      <Grid data={data} />
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        contentLabel="Test Modal"
        className="modal"
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
      <div className="pagination-block">
        <ArrowBackIosIcon
          className="pagination-block--arrow-icon"
          onClick={prevCurrentpage}
        />
        {maxPage > 1 && renderPagination()}
        <ArrowForwardIosIcon
          className="pagination-block--arrow-icon"
          onClick={nextCurrentpage}
        />
      </div>
    </div>
  );
};

export default Planets;
