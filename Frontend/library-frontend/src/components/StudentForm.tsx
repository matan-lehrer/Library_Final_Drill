import { useState } from "react";
import { Student } from "../types/Student";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
