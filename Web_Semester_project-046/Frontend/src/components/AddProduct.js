import React from 'react';
const AddProduct =()=>{
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [error,setError] = React.useState(false);
  const addProduct = async () => {
        console.warn(!name);
        if(!name || !price || !category || !company){
            setError(true)
            return false
        }


    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
     let result = await fetch("http://127.0.0.1:5000/add-product", {
       method: "post",
       body: JSON.stringify({ name, price, category, company }),
       headers: {
         "Content-Type": "application/json",
       }
     });
     result = await result.json();
     console.warn(result);
  }
    return (
      <div className="product">
        <h3>Add Product</h3>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {error && !name &&<span className='invalid-input' >Name is not valid</span>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {error && !price &&<span className='invalid-input' >Price is not valid</span>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {error && !category &&<span className='invalid-input' >Category is not valid</span>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {error && !company &&<span className='invalid-input' >Company is not valid</span>}
        <button onClick={addProduct} className="appButton">
          Add Product
        </button>
      </div>
    );
  
};


export default AddProduct;
