package cl.duoc.biblioteca.service;
import cl.duoc.biblioteca.dto.BookRequest;
import cl.duoc.biblioteca.model.Book;
import cl.duoc.biblioteca.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class BookService {
    private final BookRepository repository;
    public BookService(BookRepository repository) {
        this.repository = repository;
    }
    public List<Book> list() { return repository.findAll(); }
    public Book find(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Libro no encontrado"));
    }
    public Book create(BookRequest input) {
        Book book = new Book();
        book.setTitle(input.title().trim());
        book.setAuthor(input.author().trim());
        return repository.save(book);
    }
    public Book update(Long id, BookRequest input) {
        Book book = find(id);
        book.setTitle(input.title().trim());
        book.setAuthor(input.author().trim());
        return repository.save(book);
    }
    public void delete(Long id) {
        Book book = find(id);
        repository.delete(book);
    }
}
