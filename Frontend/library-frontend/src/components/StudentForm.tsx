// src/components/StudentForm.tsx
import { useState } from "react";
import { Student } from "../types/Student";
import { TextField, Button, Paper, Box } from "@mui/material";

interface Props {
  student?: Student;
  onSubmit: (student: Partial<Student>) => void;
}

const StudentForm = ({ student, onSubmit }: Props) => {
  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentForm;
