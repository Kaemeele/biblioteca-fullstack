import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { bookService } from '../services/bookService';
import { getErrorMessage } from '../utils/getErrorMessage';

export default function BookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setError('');
    setBook(null);
    if (!id) { setLoading(false); return; }
    setLoading(true);
    bookService.find(id)
      .then(data => { if (active) setBook(data); })
      .catch(error => { if (active) setError(getErrorMessage(error)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function saveBook(values) {
    if (id) await bookService.update(id, values);
    else await bookService.create(values);
    navigate('/');
  }

  if (loading) return <p>Cargando libro…</p>;
  if (error) return (
    <>
      <p role="alert" className="alert alert-danger">{error}</p>
      <Link to="/">Volver</Link>
    </>
  );
  if (id && !book) return <p>Preparando libro…</p>;

  return (
    <>
      <h1>{id ? 'Editar libro' : 'Nuevo libro'}</h1>
      <BookForm
        key={id || 'new'}
        initialBook={book || { title: '', author: '' }}
        onSave={saveBook}
      />
      <Link to="/">Volver</Link>
    </>
  );
}