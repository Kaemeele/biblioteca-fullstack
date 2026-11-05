import { Container } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import BookEditor from './pages/BookEditor';

export default function App() {
  return (
    <Container className="py-4">
      <nav className="mb-3">
        <Link to="/">Biblioteca</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/new" element={<BookEditor />} />
        <Route path="/edit/:id" element={<BookEditor />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </Container>
  );
}