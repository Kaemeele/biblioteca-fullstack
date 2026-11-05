package cl.duoc.biblioteca.repository;
import cl.duoc.biblioteca.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookRepository extends JpaRepository<Book, Long> {}
