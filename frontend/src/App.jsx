import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';
import BookEditor from './pages/BookEditor';

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/new" element={<BookEditor />} />
        <Route path="/edit/:id" element={<BookEditor />} />
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </div>
  );
}

export default App;