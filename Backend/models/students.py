from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    enrollment_date = Column(Date, nullable=False)
    grade_level = Column(String(20))

    loans = relationship("BookLoan", back_populates="student")

