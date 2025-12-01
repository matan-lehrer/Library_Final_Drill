# /models/students.py
from datetime import date
from typing import Optional
from sqlalchemy import Integer, String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Student(Base):
    __tablename__ = "students"

    student_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    enrollment_date: Mapped[date] = mapped_column(Date, nullable=False)
    grade_level: Mapped[Optional[str]] = mapped_column(String(20))

    loans = relationship("BookLoan", back_populates="student")
