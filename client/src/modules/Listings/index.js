import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import { connect } from "react-redux";
// import Filter from "./sections/filter";
import { requestFetch } from "./actions";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

class Listings extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   listingSale:[]
    // }
  }
  componentDidMount() {
    loadScript("js/plugin.js");
    loadScript("js/main.js");
    this.props.handleClick();
     }
 getCity = () =>{
    return new URLSearchParams(location.search).get("city") || '';
  }


  renderItem() {
    return this.props.listingSale.filter(property => property.properties.landLot.address
      .includes(this.getCity())).map(
      (item, index) =>
        !item.owners.includes(this.props.user.publicAddress) && (
          <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
            <div className="single-property-box">
              <div className="property-item">
                <Link
                  className="property-img"
                  to={`property/${item.transactionHash}`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item.images[0]}`}
                    alt="#"
                  />
                </Link>
              </div>
              <div className="property-title-box">
                <h4>
                  <Link to={`property/${item.transactionHash}`}>
                    {item.moreInfo.title}
                  </Link>
                </h4>
                <div className="property-location">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>{item.properties.landLot.address}</p>
                </div>
                <div className="trend-open mt-10">
                  <p> {formatCurrency(item.moreInfo.price)} VND</p>
                </div>
                <ul className="property-feature">
                  <li>
                    {" "}
                    <i className="fas fa-bed"></i>
                    <span>{item.moreInfo.numOfBedrooms} phòng ngủ</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-bath"></i>
                    <span>{item.moreInfo.numOfBathrooms} phòng vệ sinh</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-arrows-alt"></i>
                    <span>{item.moreInfo.areaFloor} m2</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-car"></i>
                    <span>{item.moreInfo.utilities.length} tiện ích</span>
                  </li>
                </ul>
                <div
                  className="trending-bottom"
                  style={{ padding: "15px 0px" }}
                >
                  <div className="trend-right float-right">
                    <div className="trend-open">
                      <button
                        class="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          this.props.history.push(
                            `property/${item.transactionHash}`
                          )
                        }
                      >
                        <i class="ion-android-add-circle"></i> Xem chi tiết
                      </button>
                      <button
                        class="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          this.props.history.push(
                            `create-transaction/${item.transactionHash}`
                          )
                        }
                      >
                        <i class="ion-android-add-circle"></i> Mua
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    );
  }

  render() {
    return (
      <div>
        <div className="filter-wrapper section-padding">
          <div className="container">
            {this.props.listingSale.filter(property => property.properties.landLot.address.
            includes(this.getCity())).length === 0 ? (
              <h3 className="post-title text-center">
                Không có tài sản nào đang bán
              </h3>
            ) : (
            <div className="row">{this.renderItem()}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listingSale: state.listingSale,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(requestFetch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
