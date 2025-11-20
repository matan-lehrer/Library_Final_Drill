import { useState } from "react";
import { BookLoan } from "../types/BookLoan";

interface Props {
  onSubmit: (loan: Partial<BookLoan>) => void;
  studentOptions: { student_id: number; first_name: string; last_name: string }[];
  bookOptions: { book_id: number; title: string }[];
}

const LoanForm = ({ onSubmit, studentOptions, bookOptions }: Props) => {
  const [studentId, setStudentId] = useState<number | undefined>();
  const [bookId, setBookId] = useState<number | undefined>();
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !bookId) return;

    onSubmit({
      student_id: studentId,
      book_id: bookId,
      loan_date: new Date().toISOString(),
      due_date: dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
        <option value="">Select Student</option>
        {studentOptions.map((s) => (
          <option key={s.student_id} value={s.student_id}>
            {s.first_name} {s.last_name}
          </option>
        ))}
      </select>

      <select value={bookId} onChange={(e) => setBookId(Number(e.target.value))}>
        <option value="">Select Book</option>
        {bookOptions.map((b) => (
          <option key={b.book_id} value={b.book_id}>
            {b.title}
          </option>
        ))}
      </select>

      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <button type="submit">Create Loan</button>
    </form>
  );
};

export default LoanForm;
