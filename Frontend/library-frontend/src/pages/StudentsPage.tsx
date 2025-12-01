// src/pages/StudentsPage.tsx
import { useEffect, useState } from "react";
import { Student } from "../types/Student";
import { studentsService } from "../api/students";
import StudentForm from "../components/StudentForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from "@mui/material";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    const res = await studentsService.getAll();
    setStudents(res.data);
  };

  const handleCreateOrUpdate = async (studentData: Partial<Student>) => {
    if (editingStudent) {
      await studentsService.update(editingStudent.id, studentData);
      setEditingStudent(null);
    } else {
      await studentsService.create(studentData);
    }
    fetchStudents();
  };

  const handleDelete = async (id: number) => {
    await studentsService.remove(id);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={2}>Students</Typography>

      <StudentForm
        student={editingStudent ?? undefined}
        onSubmit={handleCreateOrUpdate}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Enrollment Date</TableCell>
              <TableCell>Grade Level</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.first_name}</TableCell>
                <TableCell>{s.last_name}</TableCell>
                <TableCell>{s.enrollment_date}</TableCell>
                <TableCell>{s.grade_level}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => setEditingStudent(s)}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(s.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentsPage;
