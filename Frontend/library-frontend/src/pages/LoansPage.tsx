import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { Student } from "../types/Student";
import { BookLoan } from "../types/BookLoan";
import { booksService } from "../api/books";
import { studentsService } from "../api/students";
import { loansService } from "../api/loans";
import LoanForm from "../components/LoanForm";

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

  return (
    <div>
      <h1>Loans</h1>

      <LoanForm books={books} students={students} onSubmit={handleIssueLoan} />

      <ul>
        {loans.map((l) => (
          <li key={l.id}>
            Book ID: {l.book_id} | Student ID: {l.student_id} | Loaned: {l.loan_date} | Returned: {l.return_date ?? "Not yet"}
            {!l.return_date && <button onClick={() => handleReturnLoan(l)}>Return</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoansPage;
