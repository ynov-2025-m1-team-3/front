import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/navbar";
import DataCard from "../../components/Datacard";

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
        { id: 0, value: 60, label: "Email" },
        { id: 1, value: 40, label: "Formulaire" },
        { id: 2, value: 28, label: "Google" },
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
  <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {filteredCards.map((card) => (
              <Grid item key={card.id}>
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
    );
  };
export default Dashboard;
