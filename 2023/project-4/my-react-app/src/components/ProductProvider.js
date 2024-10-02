import React, { createContext, useContext } from 'react';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

// Utwórz Provider
export function ProductProvider({ children, updateProduct }) {
  return (
    <ProductContext.Provider value={{ updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}