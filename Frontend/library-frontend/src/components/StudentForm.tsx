// src/components/StudentForm.tsx
import { useState, useEffect } from "react";
import { Student } from "../types/Student";
import { TextField, Button, Box } from "@mui/material";

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: Partial<Student>) => void;
}

const StudentForm = ({ student, onSubmit }: StudentFormProps) => {
  const [firstName, setFirstName] = useState(student?.first_name || "");
  const [lastName, setLastName] = useState(student?.last_name || "");
  const [enrollmentDate, setEnrollmentDate] = useState(student?.enrollment_date || "");
  const [gradeLevel, setGradeLevel] = useState(student?.grade_level || "");

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name);
      setLastName(student.last_name);
      setEnrollmentDate(student.enrollment_date);
      setGradeLevel(student.grade_level);
    } else {
      setFirstName("");
      setLastName("");
      setEnrollmentDate("");
      setGradeLevel("");
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      enrollment_date: enrollmentDate,
      grade_level: gradeLevel,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Enrollment Date"
        type="date"
        value={enrollmentDate}
        onChange={(e) => setEnrollmentDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Grade Level"
        value={gradeLevel}
        onChange={(e) => setGradeLevel(e.target.value)}
      />
      <Button type="submit" variant="contained">Save</Button>
    </Box>
  );
};

export default StudentForm;
