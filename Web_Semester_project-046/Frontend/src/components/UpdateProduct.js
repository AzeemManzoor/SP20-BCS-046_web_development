import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct =()=>{
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const navigate = useNavigate();
const params = useParams();

useEffect(()=>{
  
  getProductDetails();
},[])

const getProductDetails=async()=>{
  console.warn(params)
  let result = await fetch(`http://127.0.0.1:5000/product/${params.id}`)
  result = await result.json();
  setName(result.name)
  setPrice(result.price)
  setCategory(result.category)
  setCompany(result.category)
  
}

  const updateProduct = async () => {
        console.warn(name,price,category,company)
        let result = await fetch(`http://127.0.0.1:5000/product/${params.id}`,{
          method:'Put',
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type':"application/json"
          }
        });
    result =await result.json();
    console.warn(result);
    navigate('/');
  }
    return (
      <div className="product">
        <h3>Update Product</h3>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        
        <button onClick={updateProduct} className="appButton">
          Update Product
        </button>
      </div>
    );
  
};


export default UpdateProduct;
