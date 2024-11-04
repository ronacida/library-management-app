import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import BooksPage from '@/pages/BooksPage';
import BookDetailsPage from '@/pages/BookDetailsPage';
import UserDetailsPage from '@/pages/UserDetailsPage';
import UsersPage from '@/pages/UsersPage';
import CreateUserPage from '@/pages/CreateUserPage';
import CreateBookPage from '@/pages/CreateBookPage';
import Header from '@/components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
