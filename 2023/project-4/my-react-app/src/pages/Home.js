import '../assets/css/Root.css';
import React, { useState } from 'react';
import catImage from '../assets/images/cat.jpg';

export default function Root({ childern }) {
  return (
    <div className="Main-header">
        <p>
            Hello world
        </p>
        <img src={catImage} className="Main-logo" alt="Cat begging for 3.0" />
        <p>
            Daj pan 3.0 🙏
        </p>
    </div>
  );
}