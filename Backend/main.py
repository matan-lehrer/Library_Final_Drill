from fastapi import FastAPI
from database import Base, engine

import models.books
import models.students
import models.book_loans

Base.metadata.create_all(bind=engine)

from endpoints import books, students, book_loans
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Library Management API")

app.include_router(students.router)
app.include_router(books.router)
app.include_router(book_loans.router)

# main.py

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
