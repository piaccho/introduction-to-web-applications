import '../assets/css/Root.css';
import validImage from '../assets/images/check-solid-green.svg'
import invalidImage from '../assets/images/xmark-solid-red.svg'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Protected() {
    const [user, setUser] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('http://127.0.0.1:5000/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setUser(response.data.logged_in_as);
          })
          .catch(error => {
            console.error('Błąd pobierania danych chronionych: ', error);
          });
      }
    }, []);
  
    return (
      <div className='Main-header'>
        {user ? (
            <div className='User-status'>
                <img src={validImage} alt="Valid check" />
                <p>Hello, {user}! You have acces to this page. 😸</p>
            </div>
        ) : (
            <div className='User-status'>
                <img src={invalidImage} alt="Invalid x mark" />
                <p>User not authorized. You don't have acces to this page. 😾</p>
            </div>
        )}
      </div>
    );
  };