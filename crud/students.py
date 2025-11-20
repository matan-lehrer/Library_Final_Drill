from sqlalchemy.orm import Session
from models.students import Student as StudentModel
from schemas.students import StudentCreate, Student

def create_student(db: Session, student: StudentCreate):
    db_student = StudentModel(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(StudentModel).offset(skip).limit(limit).all()
