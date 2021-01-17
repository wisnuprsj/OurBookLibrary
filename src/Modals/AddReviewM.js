import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";

const AddReviewM = (props) => {
  const [listName, setListName] = useState([]);
  const [reviewer, setReviewer] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getAllUser`;
    const res = await fetch(uri).then((response) => response.json());
    const lstUser = res.data;
    setListName(lstUser);
    setReviewer(lstUser[0]);
  };

  const handleChangeReview = (event) => {
    setReview(event.target.value);
  };

  const handleChangeReviewer = (event) => {
    setReviewer(event.target.value);
  };

  const handleSaveReview = async (event) => {
    if (review.length > 0) {
      saveReview();
    }
  };

  const saveReview = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/postreview`;
    const response = await fetch(uri, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
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
        reviews: {
          review: review,
          reviewer: reviewer,
        },
      }), // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
      props.onHide("save");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <h5>Add Book Review</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <textarea
            className="form-control"
            name="review"
            rows="6"
            placeholder="Add Your Review Here"
            value={review}
            onChange={handleChangeReview}
          />
          <label>Reviewer : </label>
          <select
            className="form-control reviewer"
            name="reviewer"
            onChange={handleChangeReviewer}
            value={reviewer}
          >
            {listName.map((item, index) => {
              return <option key={index}>{item.fullName}</option>;
            })}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleSaveReview}
        >
          Save Review
        </button>
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

export default AddReviewM;
