import { Link } from 'react-router-dom';

export default function BookTable({ books, onDelete, deletingId }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link className="btn btn-outline-primary me-2" to={`/edit/${book.id}`}>
                  Editar
                </Link>
                <button
                  className="btn btn-outline-danger"
                  disabled={deletingId !== null}
                  onClick={() => onDelete(book)}
                >
                  {deletingId === book.id ? 'Eliminando…' : 'Eliminar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}