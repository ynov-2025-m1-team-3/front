import { useState, useEffect } from "react";
import useData from "@hooks/useData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box,
  TablePagination 
} from "@mui/material";

const FeedbackTable = () => {
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { feedbacks, setFeedbacks, loading, setLoading, error, setError, fetchFeedbacks } = useData();

  useEffect(() => {
      fetchFeedbacks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography variant="h6">Chargement des données...</Typography>
      </Box>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6">
          Aucune donnée disponible. Veuillez uploader un fichier JSON.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#20b4dc', color: 'white' }}>ID</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#20b4dc', color: 'white' }}>Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#20b4dc', color: 'white' }}>Canal</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#20b4dc', color: 'white' }}>Texte</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {feedbacks
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => (
      <TableRow key={row.id || index} hover>
        <TableCell>{row.id || `Item ${index + 1}`}</TableCell>
        <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
        <TableCell>{row.channel}</TableCell>
        <TableCell>{row.text}</TableCell>
      </TableRow>
    ))}
</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={feedbacks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default FeedbackTable;