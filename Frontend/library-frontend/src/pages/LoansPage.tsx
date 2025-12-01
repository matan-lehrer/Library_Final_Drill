// src/pages/LoansPage.tsx
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { Student } from "../types/Student";
import { BookLoan } from "../types/BookLoan";
import { booksService } from "../api/books";
import { studentsService } from "../api/students";
import { loansService } from "../api/loans";
import LoanForm from "../components/LoanForm";
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

const LoansPage = () => {
  const [loans, setLoans] = useState<BookLoan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchLoans = async () => {
    const res = await loansService.getAll();
    setLoans(res.data);
  };

  const fetchBooks = async () => {
    const res = await booksService.getAll();
    setBooks(res.data);
  };

  const fetchStudents = async () => {
    const res = await studentsService.getAll();
    setStudents(res.data);
  };

  const handleIssueLoan = async (loanData: Partial<BookLoan>) => {
    await loansService.create(loanData);
    fetchLoans();
  };

  const handleReturnLoan = async (loan: BookLoan) => {
    const returnDate = new Date().toISOString();
    await loansService.returnLoan(loan.id, returnDate);
    fetchLoans();
  };

  useEffect(() => {
    fetchLoans();
    fetchBooks();
    fetchStudents();
  }, []);

  const getBookTitle = (id: number) => books.find((b) => b.id === id)?.title || id;
  const getStudentName = (id: number) =>
    students.find((s) => s.id === id)?.name || id;

  return (
    <Box>
      <Typography variant="h4" mb={2}>Loans</Typography>

      <LoanForm books={books} students={students} onSubmit={handleIssueLoan} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Loan Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{getBookTitle(l.book_id)}</TableCell>
                <TableCell>{getStudentName(l.student_id)}</TableCell>
                <TableCell>{new Date(l.loan_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {l.return_date
                    ? new Date(l.return_date).toLocaleDateString()
                    : "Not yet"}
                </TableCell>
                <TableCell>
                  {!l.return_date && (
                    <Button
                      onClick={() => handleReturnLoan(l)}
                      variant="outlined"
                      color="success"
                    >
                      Return
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoansPage;
