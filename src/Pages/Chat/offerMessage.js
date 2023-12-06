import React, { Fragment } from "react";
import { Cash, Card } from "../../assets/images";
import { padLeadingZeros } from "../../utils/helpers";
const OfferMessage = (props) => {
  const { item, roomDetails } = props;

  const userInformation = (item, type) => {
    props.checkUserDetails(item, type);
  };
  return (
    <Fragment>
      <div
        className="buyer-cardinfo buyer-detail-card mobile-chat-buyer"
        style={{ width: "100%" }}
      >
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            <span className="img-thumb img-md-thumbnail">
              <img src={item?.item?.image} alt="postImage" />
            </span>
            <figcaption>
              <h5>
                <span>Offer Sent/Received &nbsp;</span>
              </h5>
              <strong>
                {item?.item?.meetUp && <span>Meet Up</span>}
                {item?.item?.shipping && <span>Shipping</span>} Offer for{" "}
                {item?.item?.price.toFixed(2)} SR
              </strong>
              <div className="paymethod">
                <small>Payment Method</small>
                {item?.item?.payment_type === "CASH" ? (
                  <span className="card-pay">
                    <img src={Cash} alt="card_image" />
                  </span>
                ) : item?.item?.payment_type === "ONLINE" ? (
                  <span className="card-pay">
                    <img src={Card} alt="card_image" />
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </figcaption>
          </figure>

          <div className="openmore_detail">
            <h6>
              <span
                className="cursor-pointer "
                onClick={() => userInformation(roomDetails, "BUYER")}
              >
                Buyer&nbsp;(#{padLeadingZeros(roomDetails.buyer.userId, 10)})
              </span>
            </h6>
            <ul>
              <li>
                <span>Offer Price:</span>
                <span>{item?.item?.price.toFixed(2)} SR</span>
              </li>
              <li>
                <span>Shipping Fee:</span>
                <span>{item?.item?.buyer_shipping_fee.toFixed(2)} SR</span>
              </li>
              <li>
                <span>Processing Fee:</span>
                <span>{item?.item?.Processing_fee.toFixed(2)} SR</span>
              </li>

              <li className="sub_total">
                <strong>Total Payout:</strong>
                <strong> {item?.item?.total.toFixed(2)} SR</strong>
              </li>
            </ul>
          </div>

          <div className="openmore_detail">
            <h6>
              <span
                className="cursor-pointer "
                onClick={() => userInformation(roomDetails, "SELLER")}
              >
                Seller &nbsp;(#{padLeadingZeros(roomDetails.seller.userId, 10)})
              </span>
            </h6>
            <ul>
              <li>
                <span>Offer Price:</span>
                <span>{item?.item?.price.toFixed(2)} SR</span>
              </li>
              <li>
                <span>Shipping Fee:</span>
                <span>{item?.item?.seller_shipping_fee.toFixed(2)} SR</span>
              </li>
              <li>
                <span>Service Fee:</span>
                <span>{item?.item?.serviceFees.toFixed(2)} SR</span>
              </li>

              <li className="sub_total">
                <strong>Total Payout:</strong>
                <strong> {item?.item?.sellerPayout.toFixed(2)} SR</strong>
              </li>
            </ul>
          </div>
          <span className="date-fix">
            {item.date} {item.time}
          </span>
        </div>
      </div>
      <div></div>
    </Fragment>
  );
};

export default OfferMessage;
