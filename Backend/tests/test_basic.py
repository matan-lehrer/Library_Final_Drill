import sys
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Add project root to sys.path to import main.py
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from main import app
from database import Base, get_db

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool  # ensures same connection for in-memory DB
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)

client = TestClient(app)


def test_read_books():
    response = client.get("/books/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_student():
    new_student = {
        "first_name": "Test",
        "last_name": "Student",
        "enrollment_date": "2025-01-01",
        "grade_level": "10"
    }
    response = client.post("/students/", json=new_student)
    assert response.status_code == 200
    data = response.json()
    assert data["first_name"] == "Test"
    assert "student_id" in data

def test_create_book_loan():
    new_book = {
        "title": "Test Book",
        "author": "Author",
        "category": "Category",
        "edition": "1st",
        "total_copies": 5,
        "available_copies": 5
    }
    book_resp = client.post("/books/", json=new_book)
    assert book_resp.status_code == 200
    