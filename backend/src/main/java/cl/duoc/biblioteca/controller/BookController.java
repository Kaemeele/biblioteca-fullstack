package cl.duoc.biblioteca.controller;
import cl.duoc.biblioteca.dto.BookRequest;
import cl.duoc.biblioteca.model.Book;
import cl.duoc.biblioteca.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service) { this.service = service; }
    @GetMapping
    public List<Book> list() { return service.list(); }
    @GetMapping("/{id}")
    public Book find(@PathVariable Long id) { return service.find(id); }
    @PostMapping
    public ResponseEntity<Book> create(@Valid @RequestBody BookRequest input) {
        Book book = service.create(input);
        return ResponseEntity.created(URI.create("/api/books/" + book.getId()))
            .body(book);
    }
    @PutMapping("/{id}")
    public Book update(@PathVariable Long id,
                       @Valid @RequestBody BookRequest input) {
        return service.update(id, input);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
