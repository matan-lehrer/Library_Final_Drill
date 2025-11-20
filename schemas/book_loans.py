from pydantic import BaseModel
from typing import Optional
from datetime import date


class BookLoanBase(BaseModel):
    student_id: int
    book_id: int
    loan_date: date
    due_date: date
    return_date: Optional[date]

class BookLoanCreate(BookLoanBase):
    pass

class BookLoan(BookLoanBase):
    loan_id: int

    class Config:
        orm_mode = True