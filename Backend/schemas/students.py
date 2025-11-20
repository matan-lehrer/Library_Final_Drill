from pydantic import BaseModel
from typing import Optional
from datetime import date


class StudentBase(BaseModel):
    first_name: str
    last_name: str
    enrollment_date: date
    grade_level: Optional[str]

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    student_id: int

    class Config:
        orm_mode = True