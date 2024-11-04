import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookProvider } from './contexts/BookContext';
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BookProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </BookProvider>
  </React.StrictMode>
);
