import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

function AddbookM(props) {
  const name = props.listposession ? props.listposession[0].fullName : [];
  console.log(props.listposession);
  const [possession, setPossession] = useState(name);
  const [buyDate, setBuyDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [invalid, setInvalid] = useState(false);

  const saveData = (event) => {
    if (location.length > 0) {
      setInvalid(false);
      props.onSave(possession, buyDate, location);
      setPossession("");
      setBuyDate("");
      setLocation("");
    } else {
      setInvalid(true);
    }
  };

  const handleChangePossession = (event) => {
    setPossession(event.target.value);
  };

  const handleChangeBuyDate = (event) => setBuyDate(event.target.value);

  const handleLocation = (event) => setLocation(event.target.value);

  const handleClose = (event) => {
    setInvalid(false);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id={`modal${props.id}`}>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Book Summary</h4>
        <table className="table">
          <tbody>
            <tr className="table-info">
              <td>Book Title : </td>
              <td>
                <input
                  type="text"
                  className="form-control bookTitle"
                  name="bookTitle"
                  value={props.title}
                  disabled
                />
              </td>
            </tr>
            <tr className="table-info">
              <td>Author : </td>
              <td>
                <input
                  type="text"
                  className="form-control bookAuthor"
                  name="bookAuthor"
                  value={props.author}
                  disabled
                />
              </td>
            </tr>
            <tr className="table-info">
              <td>Posession : </td>
              <td>
                <select
                  className="form-control possesion"
                  name="possesion"
                  onChange={handleChangePossession}
                  value={possession}
                >
                  {props.listposession.map((item, index) => {
                    return <option key={index}>{item.fullName}</option>;
                  })}
                </select>
              </td>
            </tr>
            <tr className="table-info">
              <td>Location : </td>
              <td>
                <input
                  type="text"
                  className={
                    `form-control location ` + `${invalid ? "is-invalid" : ""}`
                  }
                  name="location"
                  onChange={handleLocation}
                  value={location}
                  placeholder="Please provide full address location"
                />
                <div className="invalid-feedback">
                  full address location required
                </div>
              </td>
            </tr>
            <tr className="table-info">
              <td>Buy Date : </td>
              <td>
                <input
                  type="date"
                  className="form-control buyDate"
                  name="buyDate"
                  onChange={handleChangeBuyDate}
                  value={buyDate}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-success" onClick={saveData}>
          Save to Collection
        </Button>
        <Button className="btn-danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddbookM;

<div class="form-group"></div>;
