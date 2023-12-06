import React, { Fragment } from "react";

const CardMessage = (props) => {
  const { item } = props;

  const handleViewClick = () => {
    props.handleViewClick(item);
  };

  return (
    <Fragment>
      <div className="buyer-cardinfo buyer-detail-card">
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            <figcaption className="accepted-offer-main-div-cs">
              <h5 className="mb-2">
                <span className="offer-accepted-cs">
                  Order was placed successfully
                </span>
              </h5>
              <button className="btn btn-primary" onClick={handleViewClick}>
                Track Order
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
    </Fragment>
  );
};

export default CardMessage;
