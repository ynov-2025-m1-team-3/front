import { useState, useEffect } from "react";
import { Box, Container, Grid, CircularProgress, Tabs, Tab } from "@mui/material";
import Navbar from "@/components/Navbar";
import DataCard from "@/components/Datacard";
import FeedbackTable from "@/components/dataTab";
import { Typography } from "@mui/material";
import useData from "@hooks/useData";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { feedbacks, loading, error } = useData();
  const [dataCards, setDataCards] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  
  // Traitement des données pour les visualisations
  useEffect(() => {
    if (feedbacks && feedbacks.length > 0) {
      const sentimentData = [
        { id: 0, value: 0, label: "Positif" },
        { id: 1, value: 0, label: "Neutre" },
        { id: 2, value: 0, label: "Négatif" },
      ];
      
      const channelCounts = {};
      
      feedbacks.forEach(feedback => {
        if (!channelCounts[feedback.channel]) {
          channelCounts[feedback.channel] = 0;
        }
        channelCounts[feedback.channel]++;
        
        const sentiment = feedback.sentiment || Math.random();
        
        if (sentiment > 0.6) {
          sentimentData[0].value++; 
        } else if (sentiment < 0.4) {
          sentimentData[2].value++; 
        } else {
          sentimentData[1].value++;
        }
      });
      
      const channelData = Object.entries(channelCounts).map(([channel, count], index) => ({
        id: index,
        value: count,
        label: channel
      }));
      
      setDataCards([
        {
          id: 1,
          title: "Sentiment général",
          note: feedbacks.length,
          description: "Analyse des sentiments",
          data: sentimentData,
        },
        {
          id: 2,
          title: "Répartition par canal",
          note: feedbacks.length,
          description: "Origine des retours",
          data: channelData,
        },
      ]);
    }
  }, [feedbacks]);

  const filteredCards = dataCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress sx={{ color: "#20b4dc" }} />
        <Typography variant="h6" sx={{ ml: 2 }}>Chargement des données...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Navbar onSearch={setSearchTerm} />

      <Box sx={{ width: "100%", maxWidth: "lg", px: 2, mt: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<PieChartIcon />} 
            label="GRAPHIQUES" 
            sx={{ 
              color: tabValue === 0 ? "#20b4dc" : "text.secondary",
              "&.Mui-selected": { color: "#20b4dc" }
            }} 
          />
          <Tab 
            icon={<TableChartIcon />} 
            label="TABLEAU DÉTAILLÉ" 
            sx={{ 
              color: tabValue === 1 ? "#20b4dc" : "text.secondary",
              "&.Mui-selected": { color: "#20b4dc" }
            }} 
          />
        </Tabs>
      </Box>

      {/* Onglet Graphiques */}
      {tabValue === 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "lg", px: 2 }}>
            <Typography variant="subtitle2" sx={{ mr: 2, whiteSpace: "nowrap" }}>
              <span style={{ color: "#20b4dc", fontWeight: "bold" }}>Aperçu des données ({feedbacks.length} feedbacks)</span>
            </Typography>
            <Box sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #20b4dc" }} />
          </Box>

          <Box display="flex" flexDirection="row" flexWrap="nowrap" alignItems="center">
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
        </>
      )}

      {/* Onglet Tableau */}
      {tabValue === 1 && (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <FeedbackTable feedbacks={feedbacks} />
        </Container>
      )}
    </Box>
  );
};

export default Dashboard;