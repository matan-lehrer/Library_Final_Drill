from sqlalchemy.orm import Session
from models.books import Book as BookModel
from schemas.books import BookCreate, Book

def create_book(db: Session, book: BookCreate):
    db_book = BookModel(**book.model_dump())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(BookModel).offset(skip).limit(limit).all()
