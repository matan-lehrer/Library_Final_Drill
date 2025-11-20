import { useState } from "react";
import { Book } from "../types/Book";

interface Props {
  book?: Book;
  onSubmit: (book: Partial<Book>) => void;
}

const BookForm = ({ book, onSubmit }: Props) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [copies, setCopies] = useState(book?.copies || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, author, copies });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Copies:</label>
        <input
          type="number"
          min={1}
          value={copies}
          onChange={(e) => setCopies(Number(e.target.value))}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
