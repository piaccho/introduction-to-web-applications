import '../assets/css/Products.css';
import React, { useState, useEffect } from 'react'; 
import ProductFilters from '../components/ProductFilters'
import ProductList from '../components/ProductList'


export default function Products() {
  const [apiData, setApiData] = useState([]);
  const [currentDataView, setCurrentDataView] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      data.products.forEach((product, index, ) => {
        product.id = index + 1;
      });
      setApiData(data.products);
      setCurrentDataView(data.products);
    } catch (error) {
      console.log("Wystąpił błąd:", error);
    }
  };

  const applyFilters = (filterCategories, searchText) => {
    const filteredProducts = apiData.filter(product => {
      if (filterCategories.length > 0 && !filterCategories.includes(product.category))
        return false;
      if (searchText !== "" && !product.title.toLowerCase().includes(searchText.toLowerCase()))
        return false;
      return true;
    });

    setCurrentDataView(filteredProducts);
  };

  const applySort = (sortBy, sortType) => {
    if (sortBy === 'title') {
      setCurrentDataView([...currentDataView].sort((a, b) => {
        if (sortType === "asc")
          return a[sortBy].localeCompare(b[sortBy]);
        else
          return b[sortBy].localeCompare(a[sortBy]);
      }));
    } else {
      setCurrentDataView([...currentDataView].sort((a, b) => {
        if (sortType === "asc")
          return a[sortBy] - b[sortBy];
        else
          return b[sortBy] - a[sortBy];
      }));
    }
  };


  return (
      <div>
        <header className="Products-section">
          <ProductFilters
            data={apiData}
            applyFilters={applyFilters}
            applySort={applySort}
          />
        </header>
          <p>{currentDataView.length} products:</p>
        <main className="Products-section">
          <ProductList data={currentDataView}/>
        </main>
      </div>
  );
}
