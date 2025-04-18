import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, date, channel, text) {
  return { id,channel, text ,date};
}

const rows = [
    createData(1, "2025-04-14T10:30:00Z", "twitter","Le support client a été très réactif et efficace."),
    createData(2, "2025-04-14T10:30:00Z", "facebook","Le produit est de bonne qualité, mais la livraison a pris trop de temps."),
    createData(3, "2025-04-14T10:30:00Z", "instagram","J'ai eu un problème avec ma commande, mais le service client m'a aidé rapidement."),
    createData(4, "2025-04-14T10:30:00Z", "linkedin","Le site web est facile à naviguer et les informations sont claires."),
    createData(5, "2025-04-14T10:30:00Z", "twitter","Je suis très satisfait de mon achat, je recommande ce produit."),
    createData(6, "2025-04-14T10:30:00Z", "facebook","Le service après-vente est excellent, ils ont résolu mon problème rapidement."),
];

export default function DataTab() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Réseau</TableCell>
            <TableCell align="left">Commentaire</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="left">{row.channel}</TableCell>
              <TableCell align="left">{row.text}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*
import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataTab({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tableau des commentaires">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Réseau</TableCell>
            <TableCell align="left">Commentaire</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="left">{row.channel}</TableCell>
              <TableCell align="left">{row.text}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// (Optionnel) Validation des props
DataTab.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      channel: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.date.isRequired,
    })
  ).isRequired,
};



*/