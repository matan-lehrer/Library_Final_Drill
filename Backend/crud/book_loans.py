# /crud/book_loans.py
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import date
from models.book_loans import BookLoan as BookLoanModel
from models.books import Book as BookModel
from schemas.book_loans import BookLoanCreate, BookLoan

def create_book_loan(db: Session, loan: BookLoanCreate):
    # Reduce available_copies by 1
    stmt = select(BookModel).where(BookModel.book_id == loan.book_id)
    book = db.execute(stmt).scalar_one_or_none()
    if book.available_copies <= 0:
        raise ValueError("No available copies of this book")
    book.available_copies -= 1

    db_loan = BookLoanModel(**loan.model_dump())
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan

def return_book(db: Session, loan_id: int, return_date: date):
    stmt = select(BookLoanModel).where(BookLoanModel.loan_id == loan_id)
    loan = db.execute(stmt).scalar_one_or_none()
    if not loan:
        raise ValueError("Loan not found")
    loan.return_date = return_date

    # Increase available copies
    stmt_book = select(BookModel).where(BookModel.book_id == loan.book_id)
    book = db.execute(stmt_book).scalar_one_or_none()
    book.available_copies += 1

    db.commit()
    db.refresh(loan)
    return loan

def get_loans(db: Session, skip: int = 0, limit: int = 100):
    stmt = select(BookLoanModel).offset(skip).limit(limit)
    return db.execute(stmt).scalars().all()
