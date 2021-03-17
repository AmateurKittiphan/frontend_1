import axios from "axios";
import React, { Component } from "react";
import history from "../history";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: [],
    };
  }
  async componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;
    const { data } = await axios.get("https://testherokuproject.herokuapp.com/products/" + id);
    this.setState({
      detail: data.product,
    });
  }

  handleChange = (e) => {
    this.setState({
      detail: { ...this.state.detail, [e.target.id]: e.target.value },
    });
  };
  update = async () => {
    const token = localStorage.getItem("token");
    const id = this.state.detail._id;
    console.log(id);
    await axios.patch(
      "https://testherokuproject.herokuapp.com/products/" + id,
      [
        { propName: "name", value: this.state.detail.name },
        { propName: "price", value: this.state.detail.price },
      ],
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    history.push("/");
    window.location.reload(true);
  };
  render() {
    return (
      <div className="container position-absolute top-50 start-50 translate-middle">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form id="myForm">
                <div className="mb-4">
                  <h2 className="text-center">{this.state.detail.name} Edit</h2>
                </div>
                <div className="d-flex justify-content-center">
                  <img
                    className="rounded-circle "
                    src={
                      "http://localhost:5000/" + this.state.detail.productImage
                    }
                    width="100" height="100"
                  ></img>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={this.state.detail.name}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={this.state.detail.price}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.update}
                  >
                    Edit
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

export default EditProduct;
