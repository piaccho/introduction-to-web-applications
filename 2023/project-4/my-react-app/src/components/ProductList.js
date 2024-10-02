import '../assets/css/ProductList.css';
import React from 'react';
import ProductItem from '../components/ProductItem';

export default function ProductList({ data }) {
  return (
    <ul className="product-list">
      {data.map(product => (
        <ProductItem key={product.id} product={product}/>
      ))}
    </ul>
  );
};