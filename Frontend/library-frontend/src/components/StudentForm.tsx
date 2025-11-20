import { useState } from "react";
import { Student } from "../types/Student";

interface Props {
  onSubmit: (student: Partial<Student>) => void;
  initialData?: Partial<Student>;
}

const StudentForm = ({ onSubmit, initialData }: Props) => {
  const [firstName, setFirstName] = useState(initialData?.first_name || "");
  const [lastName, setLastName] = useState(initialData?.last_name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ first_name: firstName, last_name: lastName, enrollment_date: new Date().toISOString() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <button type="submit">Save Student</button>
    </form>
  );
};

export default StudentForm;
