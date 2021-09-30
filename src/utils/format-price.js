import React from 'react';

export function formatPrice(item) {
    if(item.discount) {
      const discount = item.price - (item.price * item.discount);
      return (
        <>
          <span style={{color: 'red', display: 'block', fontSize: '.7rem'}}>sale</span>
          <span 
            className="price" 
            style={{textDecoration: 'line-through', color: 'red', fontSize: '1.1rem'}}>
              ${item.price} 
          </span>
          <span style={{fontSize: '1.5rem'}} className="price ml-2">${discount}</span>
        </>
      )
    }
    return <><span style={{display: 'block', height: '.7rem'}} /><span className="price">${item.price}</span></>;
  }