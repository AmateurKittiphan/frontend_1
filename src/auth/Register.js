import React, { Component } from "react";
import axios from "axios";
import history from "../history";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://testherokuproject.herokuapp.com/user/signup", {
      email: this.state.email,
      password: this.state.password,
    });
    history.push("/signin");
    window.location.reload(true);
  };

  render() {
    return (
      <div className="container position-absolute top-50 start-50 translate-middle">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form
                onSubmit={this.handleSubmit}
                action="../compomemts/ProductsList"
              >
                <div className="mb-4">
                  <h2 className="text-center">Register</h2>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
