import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://127.0.0.1:5000/products",{
      headers:{ 
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://127.0.0.1:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://127.0.0.1:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      } 
    }
    else {
      getProducts();}
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search-product-box"
        type="text"
        placeholder="Search"
        onChange={searchHandle}
      />
      <ul>
        <li>Sr.#</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length >0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price} Rs</li>
          <li>{item.category}</li>
          <li>
            <button
              className="btn btn-danger delete-button"
              onClick={() => deleteProduct(item._id)}
            >       
              Delete
            </button>
            <Link className="update btn" to={"/update/" + item._id}>
              Update
            </Link>
          </li>
        </ul>
      ))
          
      : <h4 className="no-result">No Result Found</h4>
    }
    </div>
  );
};

export default ProductList;
