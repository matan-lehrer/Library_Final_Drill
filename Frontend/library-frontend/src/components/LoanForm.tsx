// src/components/LoanForm.tsx
import { useState } from "react";
import { BookLoan } from "../types/BookLoan";
import { Book } from "../types/Book";
import { Student } from "../types/Student";
import { Paper, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  books: Book[];
  students: Student[];
  onSubmit: (loan: Partial<BookLoan>) => void;
}

const LoanForm = ({ books, students, onSubmit }: Props) => {
  const [bookId, setBookId] = useState<number | "">("");
  const [studentId, setStudentId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookId && studentId) {
      onSubmit({ book_id: bookId, student_id: studentId });
      setBookId("");
      setStudentId("");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Book</InputLabel>
          <Select
            value={bookId}
            label="Book"
            onChange={(e) => setBookId(Number(e.target.value))}
          >
            <MenuItem value="">
              <em>Select book</em>
            </MenuItem>
            {books.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Student</InputLabel>
          <Select
            value={studentId}
            label="Student"
            onChange={(e) => setStudentId(Number(e.target.value))}
          >
            <MenuItem value="">
              <em>Select student</em>
            </MenuItem>
            {students.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {`${s.first_name} ${s.last_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Issue Loan
        </Button>
      </Box>
    </Paper>
  );
};

export default LoanForm;
