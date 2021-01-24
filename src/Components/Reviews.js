import React, { useState } from "react";

const Reviews = (props) => {
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="review-container">
      <div className="review">
        <table className="table">
          <thead>
            <tr>
              <th>Reviewer :</th>
              <th>{props.name}</th>
              <th>Rating : </th>
              <td>
                {stars.map((star, index) => {
                  if (star <= Number(props.rate)) {
                    return (
                      <span
                        key={index}
                        className="fas fa-star checked fa-lg"
                      ></span>
                    );
                  }
                  return null;
                })}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">{props.review}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
