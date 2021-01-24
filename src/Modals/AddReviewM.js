import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";

const AddReviewM = (props) => {
  const [listName, setListName] = useState([]);
  const [reviewer, setReviewer] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);

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
          rate: rate,
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
          <label>Rate Your Book : </label>
          <div className="rating-wrapper">
            {/* <div class="custom-control custom-radio"> */}
            <input
              type="radio"
              id="customRadio1"
              name="customRadio"
              class="custom-control-input"
              onClick={() => {
                setRate(5);
              }}
            />
            <label class="custom-control-label" for="customRadio1"></label>
            {/* </div> */}
            {/* <div class="custom-control custom-radio"> */}
            <input
              type="radio"
              id="customRadio2"
              name="customRadio"
              class="custom-control-input"
              onClick={() => {
                setRate(4);
              }}
            />
            <label class="custom-control-label" for="customRadio2"></label>
            {/* </div> */}
            {/* <div class="custom-control custom-radio"> */}
            <input
              type="radio"
              id="customRadio3"
              name="customRadio"
              class="custom-control-input"
              onClick={() => {
                setRate(3);
              }}
            />
            <label class="custom-control-label" for="customRadio3"></label>
            {/* </div> */}
            {/* <div class="custom-control custom-radio"> */}
            <input
              type="radio"
              id="customRadio4"
              name="customRadio"
              class="custom-control-input"
              onClick={() => {
                setRate(2);
              }}
            />
            <label class="custom-control-label" for="customRadio4"></label>
            {/* </div> */}
            {/* <div class="custom-control custom-radio"> */}
            <input
              type="radio"
              id="customRadio5"
              name="customRadio"
              class="custom-control-input"
              onClick={() => {
                setRate(1);
              }}
            />
            <label class="custom-control-label" for="customRadio5"></label>
            {/* </div> */}
          </div>
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
