// src/types/BookLoan.ts
export interface BookLoan {
  id: number;
  book_id: number;
  student_id: number;
  loan_date: string;
  return_date: string | null;
}
