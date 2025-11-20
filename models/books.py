from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    author = Column(String(100))
    category = Column(String(50))
    edition = Column(String(50))
    total_copies = Column(Integer, nullable=False)
    available_copies = Column(Integer, nullable=False)

    loans = relationship("BookLoan", back_populates="book")
