# /models/book_loans.py
from datetime import date
from typing import Optional
from sqlalchemy import Date, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class BookLoan(Base):
    __tablename__ = "book_loans"

    loan_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(Integer, ForeignKey("students.student_id"), nullable=False)
    book_id: Mapped[int] = mapped_column(Integer, ForeignKey("books.book_id"), nullable=False)
    loan_date: Mapped[date] = mapped_column(Date, nullable=False)
    due_date: Mapped[date] = mapped_column(Date, nullable=False)
    return_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    student = relationship("Student", back_populates="loans")
    book = relationship("Book", back_populates="loans")
