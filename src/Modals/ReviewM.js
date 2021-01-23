import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";
import Reviews from "../Components/Reviews";

const ReviewM = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState({});

  useEffect(() => {
    if (props.book) {
      initializeModal();
    }
  }, []);

  const initializeModal = async () => {
    await setBook(props.book);
    await setIsLoading(true);
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <h5>Book Review</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="all-review">
          {isLoading ? (
            <ReactBootstrap.Spinner className="spinner" animation="border" />
          ) : (
            book.reviews.map((data) => {
              <Reviews name={data.reviewer.fullName} text={data.review} />;
            })
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewM;
