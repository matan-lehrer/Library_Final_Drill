from pydantic import BaseModel
from typing import Optional
from datetime import date


class BookBase(BaseModel):
    title: str
    author: Optional[str]
    category: Optional[str]
    edition: Optional[str]
    total_copies: int
    available_copies: int

class BookCreate(BookBase):
    pass

class Book(BookBase):
    book_id: int

    class Config:
        orm_mode = True