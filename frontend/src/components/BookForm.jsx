import { useState } from 'react';

export default function BookForm({ initialBook = { title: '', author: '' }, onSave }) {
  const [title, setTitle] = useState(initialBook.title || '');
  const [author, setAuthor] = useState(initialBook.author || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError('Completa título y autor');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave({ title: title.trim(), author: author.trim() });
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <p role="alert" className="alert alert-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título</label>
        <input id="title" className="form-control" required
          value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Autor</label>
        <input id="author" className="form-control" required
          value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <button className="btn btn-primary" disabled={saving}>
        {saving ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  );
}