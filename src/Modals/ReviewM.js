import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";
import Reviews from "../Components/Reviews";

const ReviewM = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getBook(props.id);
  }, []);

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
    if (data[0].reviews) {
      await setReviews(data[0].reviews);
    }
    setIsLoading(false);
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
          ) : reviews ? (
            reviews.map((data) => {
              return (
                <Reviews
                  name={data.reviewer.fullName}
                  review={data.review}
                  rate={data.rate}
                />
              );
            })
          ) : null}
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
