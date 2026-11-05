package cl.duoc.biblioteca.dto;
import jakarta.validation.constraints.NotBlank;
public record BookRequest(
    @NotBlank(message = "El título es obligatorio") String title,
    @NotBlank(message = "El autor es obligatorio") String author
) {}
