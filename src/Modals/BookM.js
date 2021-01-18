import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";
import AddReviewM from "../Modals/AddReviewM";

const BookM = (props) => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [changePossesion, setChangePossesion] = useState(false);
  const [listName, setListName] = useState([]);
  const [possession, setPossesion] = useState("");

  useEffect(() => {
    getBook(props.id);
    getAllUser();
  }, []);

  const handlePossesion = (event) => {
    setPossesion(event.target.value);
    if (event.target.value !== "") {
      savePossession(event.target.value);
    }
  };

  const savePossession = async (name) => {
    const uri = `${window.env.REACT_APP_BOOK_API}/collection/changePossesion`;
    const response = await fetch(uri, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id: props.id,
        possession: name,
      }), // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
      props.onHide("change");
    }
  };

  const getAllUser = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getAllUser`;
    const res = await fetch(uri).then((response) => response.json());
    const lstUser = res.data;
    setListName(lstUser);
  };

  const handleAddReview = async (event) => {
    setModalShow(true);
  };

  const handleChangePossesion = async () => {
    setChangePossesion(true);
  };

  const getBook = async (id) => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getBook`;
    const response = await fetch(uri, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id,
      }), // body data type must match "Content-Type" header
    });
    let data = await response.json();
    await setBook(data[0]);
    setIsLoading(false);
  };

  const handleClose = (event) => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Book Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <ReactBootstrap.Spinner className="spinner" animation="border" />
        ) : (
          <div className="global-wrapper-modal">
            <div className="left-wrapper">
              <img src={book.imageLinks[0].thumbnail} alt="" />
            </div>
            <div className="right-wrapper">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddReview}
              >
                Add Review
              </button>
              {book.reviews ? (
                <button type="button" className="btn btn-info">
                  Book Review
                </button>
              ) : (
                ""
              )}
              {changePossesion ? (
                <select
                  className="form-control reviewer"
                  name="reviewer"
                  onChange={handlePossesion}
                  value={possession}
                >
                  <option></option>
                  {listName.map((item, index) => {
                    return <option key={index}>{item.fullName}</option>;
                  })}
                </select>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleChangePossesion}
                >
                  Change Possesion
                </button>
              )}
            </div>

            {/* cek */}
          </div>
        )}
        {isLoading ? (
          ""
        ) : (
          <table className="table">
            <tbody>
              <tr className="table-active">
                <td>Possession:</td>
                <td>Location:</td>
              </tr>
              <tr>
                <td>{book.possession}</td>
                <td>{book.location}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      <AddReviewM
        id={props.id}
        show={modalShow}
        onHide={(save) => {
          setModalShow(false);
          if (save) {
            props.onHide();
          }
        }}
      />
    </Modal>
  );
};

export default BookM;
