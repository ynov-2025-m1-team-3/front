import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "@/components/Navbar";
import DataCard from "@/components/Datacard";
import { Typography } from "@mui/material";

const dataCards = [
  {
    id: 1,
    title: "Sentiment général",
    note: 74,
    description: "Analyse des sentiments",
    data: [
      { id: 0, value: 40, label: "Positif" },
      { id: 1, value: 35, label: "Neutre" },
      { id: 2, value: 25, label: "Négatif" },
    ],
  },
  {
    id: 2,
    title: "Répartition par canal",
    note: 128,
    description: "Origine des retours",
    data: [
      { id: 0, value: 20, label: "Email" },
      { id: 1, value: 70, label: "Formulaire" },
      { id: 2, value: 28, label: "Google" },
      { id: 3, value: 42, label: "Twitter" },

    ],
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCards = dataCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Navbar onSearch={setSearchTerm} />

      <Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "lg", px: 2, mt: 2, }}>
  <Typography variant="subtitle2" sx={{ mr: 2, whiteSpace: "nowrap" }}>
    <span style={{ color: "#20b4dc", fontWeight: "bold" }}>Appercu des données</span>
  </Typography>
        <Box sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #20b4dc" }} />
      </Box>

      <Box display="flex" flexDirection="raw" flexWrap="nowrap" alignItems="center">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {filteredCards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <DataCard
                title={card.title}
                note={card.note}
                description={card.description}
                data={card.data}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "lg", px: 2, mt: 2, }}>
        <Typography variant="subtitle2" sx={{ mr: 2, whiteSpace: "nowrap" }}>
          <span style={{ color: "#20b4dc", fontWeight: "bold" }}>Graphiques des données</span>
        </Typography>
        <Box sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #20b4dc" }} /> 
    </Box>
    </Box>
  );
};

export default Dashboard;
