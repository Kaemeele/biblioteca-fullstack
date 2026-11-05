import { Link } from 'react-router-dom';
import BookTable from '../components/BookTable';
import { useEffect, useState } from 'react';
import { bookService } from '../services/bookService';
import { getErrorMessage } from '../utils/getErrorMessage';
import React, { useEffect, useState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  async function loadBooks() {
    setLoading(true);
    setError('');
    try {
      setBooks(await bookService.list());
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadBooks(); }, []);

  async function removeBook(book) {
    if (!window.confirm(`¿Eliminar ${book.title}?`)) return;
    setDeletingId(book.id);
    setError('');
    try {
      await bookService.remove(book.id);
      await loadBooks();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <h2>Libros disponibles</h2>
      <Link to="/new" className="btn btn-primary mb-3">Nuevo libro</Link>
      {error && <p role="alert" className="alert alert-danger">{error}</p>}
      {loading ? (
        <p>Cargando…</p>
      ) : books.length === 0 ? (
        <p>No hay libros</p>
      ) : (
        <BookTable books={books} onDelete={removeBook} deletingId={deletingId} />
      )}
      <button className="btn btn-secondary" onClick={loadBooks}>Recargar</button>
    </>
  );
}