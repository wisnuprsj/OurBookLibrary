import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

const EditbookM = (props) => {
  const [book, setBook] = useState({});

  const saveData = (event) => {
    props.onHide();
  };

  const handleClose = (event) => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={saveData}>Save to Collection</Button>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
