import { useState } from "react";
import { BookLoan } from "../types/BookLoan";
import { Book } from "../types/Book";
import { Student } from "../types/Student";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book:</label>
        <select value={bookId} onChange={(e) => setBookId(Number(e.target.value))}>
          <option value="">Select book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Student:</label>
        <select value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
          <option value="">Select student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Issue Loan</button>
    </form>
  );
};

export default LoanForm;
