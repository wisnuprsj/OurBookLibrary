import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Reviews = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Review</Card.Title>
        <Card.Text>
          <h5>{props.name}</h5>
          <p>{props.text}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Reviews;
