import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { booksService } from "../api/books";
import BookForm from "../components/BookForm";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    const res = await booksService.getAll();
    setBooks(res.data);
  };

  const handleCreateOrUpdate = async (bookData: Partial<Book>) => {
    if (editingBook) {
      await booksService.update(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      await booksService.create(bookData);
    }
    fetchBooks();
  };

  const handleDelete = async (id: number) => {
    await booksService.remove(id);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Books</h1>

      <BookForm book={editingBook ?? undefined} onSubmit={handleCreateOrUpdate} />

      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author} ({b.copies})
            <button onClick={() => setEditingBook(b)}>Edit</button>
            <button onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
