import { useState, useEffect } from "react";
import { Student } from "../types/Student";
import { Box, TextField, Button, Paper } from "@mui/material";

interface StudentFormProps {
  student?: Student;
  onSubmit: (studentData: Partial<Student>) => void;
}

const StudentForm = ({ student, onSubmit }: StudentFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name || "");
      setLastName(student.last_name || "");
      setEnrollmentDate(student.enrollment_date || "");
      setGradeLevel(student.grade_level || "");
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
      grade_level: gradeLevel
    });
    setFirstName("");
    setLastName("");
    setEnrollmentDate("");
    setGradeLevel("");
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
        <Button type="submit" variant="contained">
          {student ? "Update Student" : "Create Student"}
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentForm;
