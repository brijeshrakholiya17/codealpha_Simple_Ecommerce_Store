import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>       
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
        
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
