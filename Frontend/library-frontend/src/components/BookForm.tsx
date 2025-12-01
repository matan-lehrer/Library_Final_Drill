// src/components/BookForm.tsx
import { useState } from "react";
import { Book } from "../types/Book";
import { TextField, Button, Paper, Box } from "@mui/material";

interface Props {
  book?: Book;
  onSubmit: (book: Partial<Book>) => void;
}

const BookForm = ({ book, onSubmit }: Props) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [copies, setCopies] = useState(book?.copies || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, author, copies });
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
          fullWidth
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
        <TextField
          label="Copies"
          type="number"
          inputProps={{ min: 1 }}
          value={copies}
          onChange={(e) => setCopies(Number(e.target.value))}
          sx={{ width: 120 }}
        />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default BookForm;
