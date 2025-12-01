// api/dashboard.ts
import { booksService } from "./books";
import { studentsService } from "./students";
import { loansService } from "./loans";

export const dashboardService = {
  getCounts: async () => {
    const [booksRes, studentsRes, loansRes] = await Promise.all([
      booksService.getAll(),
      studentsService.getAll(),
      loansService.getAll(),
    ]);

    return {
      books: booksRes.data.length,
      students: studentsRes.data.length,
      loans: loansRes.data.filter((l: any) => !l.return_date).length,
    };
  },
};
