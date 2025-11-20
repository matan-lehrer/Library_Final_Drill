import { useEffect, useState } from "react";
import { Student } from "../types/Student";
import { studentsService } from "../api/students";
import StudentForm from "../components/StudentForm";

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
    <div>
      <h1>Students</h1>

      <StudentForm student={editingStudent ?? undefined} onSubmit={handleCreateOrUpdate} />

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.email})
            <button onClick={() => setEditingStudent(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;
