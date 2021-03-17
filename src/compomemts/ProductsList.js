import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      products: [],
      searchText: "",
      searchedColumn: "",
      detail: { name: "", price: "", productImage: "", _id: "" },
    };
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  async productList() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("https://testherokuproject.herokuapp.com/products", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    this.setState({
      products: data.products,
    });
  }

  handleChangeTest = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  async delete() {
    const id = this.state.detail._id;
    const token = localStorage.getItem("token");
    if (token) {
      await axios.delete("https://testherokuproject.herokuapp.com/products/" + id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      history.push("/signin");
    }
  }
  updateBt = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = this.state.detail._id;
      history.push("/editproduct/" + id);
    } else {
      history.push("/signin");
    }
  };
  componentDidMount() {
    this.productList();
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Product",
        dataIndex: "",
        key: "x",
        render: (recods) => (
          <img
            className="rounded-circle"
            src={"https://testherokuproject.herokuapp.com/" + recods.productImage}
            width="50"
            height="50"
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),

        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        ...this.getColumnSearchProps("price"),

        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (recods) => (
          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <button
              type="button"
              onClick={() => {
                this.setState({ detail: recods });
              }}
              className="btn btn-primary btn-info "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@getbootstrap"
            >
              Detail
            </button>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className="">
          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Detail
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Name Product
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.detail.name}
                      />
                      <label htmlFor="exampleFormControlInput1">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.detail.price}
                      />
                      <label htmlFor="exampleFormControlInput1">Id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={this.state.detail._id}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <form action="">
                    <button
                      type="update"
                      className="btn btn-primary"
                      onClick={() => this.updateBt()}
                    >
                      Edit
                    </button>
                    <button
                      type="delete"
                      className="btn btn-secondary btn-danger"
                      onClick={() => this.delete()}
                    >
                      Delete
                    </button>
                    <button
                      type="delete"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container position-absolute top-50 start-50 translate-middle"
          style={{ paddingTop: 50 }}
        >
          <Table
            className="container"
            columns={columns}
            dataSource={this.state.products}
            onChange={this.handleChangeTest}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
            }}
            scroll={{ y: 750 }}
          />
        </div>
      </div>
    );
  }
}
