import '../assets/css/Root.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation()
  const { key, product } = location.state

  return (
    <div className='Main'>
      <h1>Product detail</h1>
      {product ? 
      (
        <div className='Product-detail'>
          <button>
            <Link
              to={{
                pathname: `/products/${product.id}/edit`,
              }}
              state={{ key: key, product: product}}
            >
              Edit
            </Link>
          </button>
          <p><b>Title:</b> {product.title}</p>
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Price:</b> ${product.price}</p>
          <p><b>Discount:</b> {product.discountPercentage}%</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Rating:</b> {product.rating}/5</p>
          <p><b>Description:</b> {product.description}</p>
          <img src={product.thumbnail} alt={product.title + " thumbnail"} />
        </div>
      ) : 
      (
        <div>Product not found</div>
      )}
    </div>
  );
}