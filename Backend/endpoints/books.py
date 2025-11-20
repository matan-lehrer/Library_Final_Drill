# endpoints/books.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from schemas.books import BookCreate, Book
from crud.books import create_book, get_books
from models.books import Book as BookModel
from database import get_db

router = APIRouter(prefix="/books", tags=["Books"])


@router.post("/", response_model=Book)
def create_book_endpoint(book: BookCreate, db: Session = Depends(get_db)):
    return create_book(db, book)


@router.get("/", response_model=List[Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_books(db, skip, limit)


@router.get("/{book_id}", response_model=Book)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(BookModel).filter(BookModel.book_id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.put("/{book_id}", response_model=Book)
def update_book(book_id: int, updated_book: BookCreate, db: Session = Depends(get_db)):
    book = db.query(BookModel).filter(BookModel.book_id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    for key, value in updated_book.model_dump().items():
        setattr(book, key, value)
    db.commit()
    db.refresh(book)
    return book


@router.delete("/{book_id}", response_model=dict)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(BookModel).filter(BookModel.book_id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    return {"detail": "Book deleted successfully"}
