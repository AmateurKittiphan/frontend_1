import axios from "axios";
import React, { Component } from "react";
import history from "../history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alert: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    const response = await axios
      .post("https://testherokuproject.herokuapp.com/user/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .catch((error) => {
        this.setState({
          alert: "Gmail or Password Wrong", //error.response.data.message,
        });
        setInterval(() => {
          this.setState({
            alert: false,
          });
        }, 3000);
      });
    if (response && response.data) {
      localStorage.setItem("token", response.data.token);
      history.push("/");
      window.location.reload(true);
    }
  };

  render() {
    return (
      <div className="container position-absolute top-50 start-50 translate-middle">
        {this.state.alert ? (
          <div className="alert alert-danger" role="alert">
            {this.state.alert}
          </div>
        ) : null}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form action="../compomemts/ProductsList">
                <div className="mb-4">
                  <h2 className="text-center">Login</h2>
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
                    onClick={() => this.handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div style={{ marginTop: 20 }}>
                <h6 className="text-center">Gmail: test1234@gamil.com</h6>
                <h6 className="text-center">Password: test1234</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
