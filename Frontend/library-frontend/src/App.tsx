import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import BooksPage from "./pages/BooksPage";
import StudentsPage from "./pages/StudentsPage";
import LoansPage from "./pages/LoansPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/loans" element={<LoansPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
