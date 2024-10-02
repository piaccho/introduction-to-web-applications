import '../assets/css/Root.css';
import React, { useEffect, useState } from 'react';
import { Form, useParams, useLocation } from "react-router-dom";
import { useProduct } from '../components/ProductProvider';


export default function ProductEdit() {
  const { updateProduct } = useProduct();
  const location = useLocation()
  const { key, product } = location.state

  const [formValues, setFormValues] = useState({
    productId: key,
    title: product.title,
    brand: product.brand,
    category: product.category,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
    rating: product.rating,
    description: product.description,
    thumbnail: product.thumbnail,
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(formValues);
  };

  useEffect(() => {
    setFormValues({
      title: product.title,
      brand: product.brand,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
      rating: product.rating,
      description: product.description,
      thumbnail: product.thumbnail,
    });
  }, [product]);

  return (
    <div className='Main'>
      <h1>Edit product</h1>
      <from onSubmit={handleSubmit} id="contact-form" className='Product-edit-form'>
      <label>
        <span>Title: </span>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Brand: </span>
        <input
          type="text"
          name="brand"
          value={formValues.brand}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Category: </span>
        <input
          type="text"
          name="category"
          value={formValues.category}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Price: </span>
        <input
          type="text"
          name="price"
          value={formValues.price}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Discount: </span>
        <input
          type="text"
          name="discountPercentage"
          value={formValues.discountPercentage}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Stock: </span>
        <input
          type="text"
          name="stock"
          value={formValues.stock}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Rating: </span>
        <input
          type="text"
          name="rating"
          value={formValues.rating}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Description: </span>
        <textarea
          className="Product-edit-description"
          name="description"
          value={formValues.description}
        onChange={handleChange}
        />
      </label>
      <label>
        <span>Thumbnail: </span>
        <input
          type="text"
          name="thumbnail"
          value={formValues.thumbnail}
        onChange={handleChange}
        />
      </label>
      <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "2vmin"}}>
        <button type="submit">Save</button>
      </p>
    </from>
    </div>
  );
}