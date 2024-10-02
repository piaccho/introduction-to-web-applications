import React, { useState, useEffect } from 'react';
import '../assets/css/ProductFilters.css';

export default function ProductFilters({ data, applyFilters, applySort }) {
  const [categories, setCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortType, setSortType] = useState('asc');

  useEffect(() => {
    generateFilterOptions();
    setSortBy("title");
    setSortType("asc");
  }, [data]);

  const generateFilterOptions = () => {
    const uniqueCategories = [...new Set(data.map(product => product.category))];
    setCategories(uniqueCategories);
    setFilterCategories([]);
  };


  return (
    <div className="wrapper">
      <div className="filter">
        <h1>Filters</h1>
        <div>
          <p style={{ marginRight: '10px' }}>Categories:</p>
          <div id="categoryCheckboxes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {categories.map(category => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  // checked={categories.includes(category)}
                  onChange={(e) => setFilterCategories(e.target.checked ? [...filterCategories, category] : filterCategories.filter(c => c !== category))}
                />
                <label htmlFor={category}>{category}</label>
                <br />
              </div>
            ))}
          </div>
        </div>

        <br />

        <p>Search:</p>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <br />
        <br />

        <button onClick={() => applyFilters(filterCategories, searchText)}>Apply Filters</button>
      </div>

      <div className="sort">
        <p>Sort by:</p>
        <select name="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} defaultValue="title">
          <option value="title">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <select name="sort-type" value={sortType} onChange={(e) => setSortType(e.target.value)} defaultValue="asc">
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
        <br />
        <br />
        <button onClick={() => applySort(sortBy, sortType)}>Sort</button>
      </div>
    </div>
  );
};
