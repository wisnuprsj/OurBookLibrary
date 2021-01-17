import AddbookM from "../Modals/AddbookM";
import React, { useState, useEffect } from "react";

function Card(props) {
  const [modalShow, setModalShow] = useState(false);
  const [btnLabel, setBtnLabel] = useState("");
  const alreadyHave = props.onHave;
  const listPosession = props.listPosession;

  useEffect(() => {
    if (alreadyHave) {
      setBtnLabel("Already Have");
    } else {
      setBtnLabel("Add Book");
    }
  }, [alreadyHave]);

  const openModal = (event) => {
    setModalShow(true);
  };

  const saveBook = (possession, buyDate, location) => {
    setModalShow(false);
    props.saveBook(props.id, possession, buyDate, location);
  };

  return (
    <div className="card mb-3 mt-3">
      <div className="row">
        <div className="col wrapthumbnail">
          <div className="cover">
            <img src={props.imgLink} alt="thumbnail" />
          </div>
        </div>
        <div className="col wrapdescription">
          <div className="card-block">
            <h4 className="card-title">{props.title}</h4>
            <h6 className="card-text">{props.author}</h6>
            <hr />
            <p>{props.description}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`modal${props.id}`}
        onClick={openModal}
        disabled={alreadyHave}
      >
        {btnLabel}
      </button>

      <AddbookM
        header={"Add Book to Colletion"}
        title={props.title}
        author={props.author}
        id={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={saveBook}
        listposession={listPosession}
      />
    </div>
  );
}

export default Card;
