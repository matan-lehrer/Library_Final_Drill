import { useState } from "react";
import { Book } from "../types/Book";

interface Props {
  onSubmit: (book: Partial<Book>) => void;
  initialData?: Partial<Book>;
}

const BookForm = ({ onSubmit, initialData }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [totalCopies, setTotalCopies] = useState(initialData?.total_copies || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      total_copies: totalCopies,
      available_copies: totalCopies,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input
        type="number"
        value={totalCopies}
        onChange={(e) => setTotalCopies(Number(e.target.value))}
        placeholder="Total Copies"
      />
      <button type="submit">Save Book</button>
    </form>
  );
};

export default BookForm;
