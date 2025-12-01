// src/types/BookLoan.ts
export interface BookLoan {
  id: number;
  book_id: number;
  student_id: number;
  loan_date: string;       // YYYY-MM-DD
  due_date: string;        // YYYY-MM-DD
  return_date: string | null;  // YYYY-MM-DD or null
}
