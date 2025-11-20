// src/types/BookLoan.ts
export interface BookLoan {
  loan_id: number;
  student_id: number;
  book_id: number;
  loan_date: string;
  due_date: string;
  return_date?: string | null;
}
