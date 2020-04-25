import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";

import { UpdateUser } from "./actions";

class EditProfile extends Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
      data: this.props.profile.values,
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    })
      .then(response => {
        this.props.actUpdate(response.data.data);
        alert("Cập nhập thành công");
      })
      .catch(err => alert("Cập nhập thất bại"));
  }
  componentDidMount() {
    const user = this.props.user;
    this.props.change("fullName", user.fullName || "");
    this.props.change("idNumber", user.idNumber || "");
    this.props.change("phoneNumber", user.phoneNumber || "");
    this.props.change("email", user.email || "");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="db-add-list-wrap">
              <div className="act-title">
                <h5>Chỉnh sửa Trang cá nhân :</h5>
              </div>
              <div className="db-add-listing">
                <div className="row">
                  <div className="col-md-4">
                    <div className="edit-profile-photo">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/images/agents/agent_1.jpg`}
                        alt=""
                      />
                      <div className="change-photo-btn">
                        <div className="contact-form__upload-btn xs-left">
                          <input
                            className="contact-form__input-file"
                            type="file"
                            name="photo-upload"
                            id="photo-upload"
                          />
                          <span>Upload Avatar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <form onSubmit={this.props.handleSubmit(this.handleUpdate)}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Họ tên</label>
                            <Field
                              component="input"
                              name="fullName"
                              type="text"
                              className="form-control filter-input"
                              placeholder="Nhập Họ tên"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Số CMND/Căn cước</label>
                            <Field
                              component="input"
                              name="idNumber"
                              type="text"
                              className="form-control filter-input"
                              placeholder="Nhập số CMND căn cước"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Số điện thoại</label>
                            <Field
                              component="input"
                              name="phoneNumber"
                              type="text"
                              className="form-control filter-input"
                              placeholder="Nhập số điện thoại"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Thư điện tử(email)</label>
                            <Field
                              component="input"
                              name="email"
                              type="text"
                              className="form-control filter-input"
                              placeholder="Nhập email"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button className="btn v3">Cập nhập</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile = reduxForm({
  // a unique name for the form
  form: "profile"
})(EditProfile);

const mapStateToProps = state => ({
  profile: state.form.profile,
  accessToken: state.login.accessToken,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    actUpdate: user => {
      dispatch(UpdateUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);