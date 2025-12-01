# /crud/students.py
from sqlalchemy.orm import Session
from sqlalchemy import select
from models.students import Student as StudentModel
from schemas.students import StudentCreate, Student

def create_student(db: Session, student: StudentCreate):
    db_student = StudentModel(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_students(db: Session, skip: int = 0, limit: int = 100):
    stmt = select(StudentModel).offset(skip).limit(limit)
    return db.execute(stmt).scalars().all()
