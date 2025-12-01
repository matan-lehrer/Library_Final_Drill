// components/DashboardCard.tsx
import { Paper, Typography } from "@mui/material";

interface Props {
  title: string;
  count: number;
}

const DashboardCard = ({ title, count }: Props) => (
  <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2, boxShadow: 2 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h3">{count}</Typography>
  </Paper>
);

export default DashboardCard;
