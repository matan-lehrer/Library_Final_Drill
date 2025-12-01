// pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import { dashboardService } from "../api/dashboard";

interface Counts {
  books: number;
  students: number;
  loans: number;
}

const Dashboard = () => {
  const [counts, setCounts] = useState<Counts>({
    books: 0,
    students: 0,
    loans: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const res = await dashboardService.getCounts();
      setCounts(res);
    };
    fetchCounts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <h1>Dashboard</h1>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, // spacing between cards
        }}
      >
        <Box sx={{ flex: "1 1 300px" }}>
          <DashboardCard title="Total Books" count={counts.books} />
        </Box>
        <Box sx={{ flex: "1 1 300px" }}>
          <DashboardCard title="Total Students" count={counts.students} />
        </Box>
        <Box sx={{ flex: "1 1 300px" }}>
          <DashboardCard title="Active Loans" count={counts.loans} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
