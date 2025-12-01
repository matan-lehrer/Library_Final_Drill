// src/pages/BooksPage.tsx
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { booksService } from "../api/books";
import BookForm from "../components/BookForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from "@mui/material";

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
    <Box>
      <Typography variant="h4" mb={2}>Books</Typography>

      <BookForm book={editingBook ?? undefined} onSubmit={handleCreateOrUpdate} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Copies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.copies}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditingBook(b)} variant="outlined" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(b.id)} variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BooksPage;
