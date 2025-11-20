export interface Book {
  book_id: number;
  title: string;
  author?: string;
  category?: string;
  edition?: string;
  total_copies: number;
  available_copies: number;
}
