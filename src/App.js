import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./layout/Navbar";
import jwt_decode from "jwt-decode";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductsList from "./compomemts/ProductsList";
import addProduct from "./compomemts/addProduct";
import EditProduct from "./compomemts/EditProduct";

export default class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const token = jwt_decode(localStorage.getItem("token"));
      if (token.exp < Date.now() / 1000) {
        localStorage.clear();
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route path="/" exact component={ProductsList} />
              <Route path="/signin" component={Login} />
              <Route path="/addproduct" component={addProduct} />
              <Route path="/signup" component={Register} />
              <Route path="/editproduct/:id" component={EditProduct} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
