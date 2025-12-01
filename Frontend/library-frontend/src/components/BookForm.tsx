// src/components/BookForm.tsx
import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { Box, Paper, TextField, Button } from "@mui/material";

interface Props {
  book?: Book;
  onSubmit: (bookData: Partial<Book>) => void;
}

const BookForm = ({ book, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [edition, setEdition] = useState("");
  const [totalCopies, setTotalCopies] = useState<number>(1);
  const [availableCopies, setAvailableCopies] = useState<number>(1);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setEdition(book.edition);
      setTotalCopies(book.total_copies);
      setAvailableCopies(book.available_copies);
    } else {
      setTitle("");
      setAuthor("");
      setCategory("");
      setEdition("");
      setTotalCopies(1);
      setAvailableCopies(1);
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      category,
      edition,
      total_copies: totalCopies,
      available_copies: availableCopies,
    });
    setTitle("");
    setAuthor("");
    setCategory("");
    setEdition("");
    setTotalCopies(1);
    setAvailableCopies(1);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          label="Edition"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          required
        />
        <TextField
          label="Total Copies"
          type="number"
          value={totalCopies}
          onChange={(e) => setTotalCopies(Number(e.target.value))}
          required
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Available Copies"
          type="number"
          value={availableCopies}
          onChange={(e) => setAvailableCopies(Number(e.target.value))}
          required
          inputProps={{ min: 0, max: totalCopies }}
        />
        <Button type="submit" variant="contained">
          {book ? "Update Book" : "Add Book"}
        </Button>
      </Box>
    </Paper>
  );
};

export default BookForm;
