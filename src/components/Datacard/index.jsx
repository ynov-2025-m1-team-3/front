import { Box, Typography, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const DataCard = ({ title, note, description, data }) => {
  return (
    <Paper sx={{ p: 3, width: 350, textAlign: "center" }} elevation={3}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <PieChart
        series={[{ data }]}
        width={300}
        height={200}
      />
      <Typography variant="h4" color="primary" mt={2}>
        {note}
      </Typography>
      <Typography variant="body2" mt={1}>
        {description}
      </Typography>
    </Paper>
  );
};

export default DataCard;
