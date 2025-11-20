from sqlalchemy.orm import Session
from datetime import date
from models.book_loans import BookLoan as BookLoanModel
from models.books import Book as BookModel
from schemas.book_loans import BookLoanCreate, BookLoan

def create_book_loan(db: Session, loan: BookLoanCreate):
    # Reduce available_copies by 1
    book = db.query(BookModel).filter(BookModel.book_id == loan.book_id).first()
    if book.available_copies <= 0:
        raise ValueError("No available copies of this book")
    book.available_copies -= 1

    db_loan = BookLoanModel(**loan.model_dump())
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan

def return_book(db: Session, loan_id: int, return_date: date):
    loan = db.query(BookLoanModel).filter(BookLoanModel.loan_id == loan_id).first()
    if not loan:
        raise ValueError("Loan not found")
    loan.return_date = return_date

    # Increase available copies
    book = db.query(BookModel).filter(BookModel.book_id == loan.book_id).first()
    book.available_copies += 1

    db.commit()
    db.refresh(loan)
    return loan

def get_loans(db: Session, skip: int = 0, limit: int = 100):
    return db.query(BookLoanModel).offset(skip).limit(limit).all()
