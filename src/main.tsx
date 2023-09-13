import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { MovieProvider } from './api/movie-api.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './api/search-api.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
