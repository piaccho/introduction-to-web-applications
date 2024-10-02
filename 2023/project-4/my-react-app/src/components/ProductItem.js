import '../assets/css/ProductList.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ key, product, updateProduct }) {
  return (
    <li className="product-item">
          <h3>{product.title}</h3>
          <h4>{product.brand}</h4>
          <h5>{product.category}</h5>
          <p>${product.price}</p>
          <button style={{marginRight: "5vmin"}}>
            <Link
              to={{
                pathname: `/products/${product.id}`,
              }}
              state={{ key: key, product: product}}
            >
              Show details
            </Link>
          </button>
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
          <p>{product.description}</p>
          <img src={product.thumbnail} alt={product.title + " thumbnail"} />
        </li>
  );
};

