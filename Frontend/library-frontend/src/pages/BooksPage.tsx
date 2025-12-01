// src/pages/BooksPage.tsx
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { booksService } from "../api/books";
import BookForm from "../components/BookForm";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
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
              <TableCell>Category</TableCell>
              <TableCell>Edition</TableCell>
              <TableCell>Total Copies</TableCell>
              <TableCell>Available Copies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.category}</TableCell>
                <TableCell>{b.edition}</TableCell>
                <TableCell>{b.total_copies}</TableCell>
                <TableCell>{b.available_copies}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(b.id)}
                  >
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
