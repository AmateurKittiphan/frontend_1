import axios from "axios";
import React, { Component } from "react";

class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { name: "", price: "" },
      selectedFile: null,
    };
  }
  fileSeleced = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };
  handleChange = (e) => {
    this.setState({
      product: { ...this.state.product, [e.target.id]: e.target.value },
    });
    console.log(this.state.product);
  };

  fileUpload = () => {
    let formData = new FormData();
    formData.append(
      "productImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("name", this.state.product.name);
    formData.append("price", this.state.product.price);

    const token = localStorage.getItem("token");
    axios.post("https://testherokuproject.herokuapp.com/products", formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    document.getElementById("myForm").reset();
  };

  render() {
    return (
      <div className="container position-absolute top-50 start-50 translate-middle">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form id="myForm">
                <div className="mb-4">
                  <h2 className="text-center">New Product</h2>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    onChange={this.handleChange}
                  />
                </div>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Product
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
                  aria-describedby="emailHelp"
                  onChange={this.fileSeleced}
                />
                <div className="d-grid gap-2 col-3 mx-auto">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.fileUpload}
                  >
                    Add
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

export default addProduct;
