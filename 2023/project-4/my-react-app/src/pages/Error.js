import '../assets/css/Root.css';
import React from 'react';
import cryingCat from '../assets/images/crying_cat.jpg'

export default function Error() {
  return (
    <div id="error-page">
      <main className='Main-header'>
        <h1>Oops!</h1>
        <p>404 - Page not found</p>
        <img src={cryingCat} className="Main-logo-s" alt="Crying cat" />
      </main>
    </div>
  );
}