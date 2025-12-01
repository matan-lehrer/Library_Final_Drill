# /endpoints/book_loans.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from schemas.book_loans import BookLoanCreate, BookLoan
from crud.book_loans import create_book_loan, return_book, get_loans
from database import get_db

router = APIRouter(prefix="/loans", tags=["Book Loans"])


@router.post("/", response_model=BookLoan)
def create_loan(loan: BookLoanCreate, db: Session = Depends(get_db)):
    try:
        return create_book_loan(db, loan)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{loan_id}/return", response_model=BookLoan)
def return_loan(loan_id: int, return_date: date, db: Session = Depends(get_db)):
    try:
        return return_book(db, loan_id, return_date)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[BookLoan])
def read_loans(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_loans(db, skip, limit)
