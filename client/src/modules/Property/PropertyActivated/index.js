import React from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { activateSaleRequest } from "./action";

function PropertyActivated({ properties, activateSale }) {
  const history = useHistory();
  return (
    <div className="viewd-item-wrap">
      {properties.map((property, index) => (
        <div className={`most-viewed-item`} key={index}>
          <div className="most-viewed-img">
            <a >
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/property/property_1.jpg`}
                alt="..."
              />
            </a>
            <ul className="feature_text">
              <li className="feature_cb">Đã duyệt</li>
            </ul>
          </div>
          <div className="most-viewed-detail">
            <h3>
              {/* <Link to={`/user/my-properties/${property.transactionHash}`}> */}
              {property.transactionHash.substr(0, 21) +
                "..." +
                property.transactionHash.substr(50)}
              {/* </Link> */}
            </h3>
            <p className="list-address">
              <i className="fas fa-map-marker-alt"></i>
              {property.properties.landLot.address}
            </p>
            <div className="trend-open">
              <p>
                <span className="per_sale">starts from</span>$25000
              </p>
            </div>
            <div className="ratings">
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star-half"></i>
            </div>
            {/* <div className="views">
                Views : <span>{property.transactionHash.length}</span>
              </div> */}
          </div>
          <div className="listing-button">
            <button
              className="btn v3"
              onClick={() =>
                history.push(
                  `property/${property.transactionHash}`
                )
              }
            >
              <i className="ion-edit"></i> Chi tiết
            </button>
            <button
              className="btn v4 ml-2"
              onClick={() =>
                history.push(
                  `my-property/edit/${property.transactionHash}`
                )
              }
            >
              <i className="ion-android-add-circle"></i> Thêm thông tin
            </button>
            <button
              className="btn v4 ml-2"
              onClick={() =>
                activateSale(property._id)
              }
            >
              <i className="ion-android-add-circle"></i> Bán
            </button>
          </div>
        </div>
      ))
      }
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    properties: state.myListing.properties.filter(
      (property) => property.state > 0
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateSale: (idCertificate) => {
      dispatch(activateSaleRequest(idCertificate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyActivated);
