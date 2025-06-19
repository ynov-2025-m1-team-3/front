import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import Navbar from "@/components/Navbar";
import DataCard from "@/components/Datacard";
import FeedbackTable from "@/components/dataTab";
import { Typography } from "@mui/material";
import useData from "@hooks/useData";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import * as Sentry from "@sentry/react";
import { SentryLogger } from "@/lib/sentryLogger";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { feedbacks, loading, error } = useData();
  const [dataCards, setDataCards] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  // Monitoring Sentry
  useEffect(() => {
    SentryLogger.logInfo("Dashboard component mounted", {
      component: "Dashboard",
    });

    if (feedbacks && feedbacks.length > 0) {
      try {
        const sentimentData = [
          { id: 0, value: 0, label: "Positif" },
          { id: 1, value: 0, label: "Neutre" },
          { id: 2, value: 0, label: "Négatif" },
        ];

        const channelCounts = {};

        feedbacks.forEach((feedback) => {
          if (!channelCounts[feedback.channel]) {
            channelCounts[feedback.channel] = 0;
          }
          channelCounts[feedback.channel]++;

          const sentiment = feedback.sentiment || Math.random();

          if (sentiment > 0.2) {
            sentimentData[0].value++;
          } else if (sentiment < 0.2 && sentiment > -0.2) {
            sentimentData[2].value++;
          } else {
            sentimentData[1].value++;
          }
        });

        const channelData = Object.entries(channelCounts).map(
          ([channel, count], index) => ({
            id: index,
            value: count,
            label: channel,
          })
        );

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

        SentryLogger.logInfo("Dashboard data processed successfully", {
          component: "Dashboard",
          feedbacks_count: feedbacks.length,
          sentiment_data_points: sentimentData.length,
          channel_data_points: channelData.length,
        });
      } catch (err) {
        SentryLogger.logError(err, {
          component: "Dashboard",
          action: "process_dashboard_data",
          feedbacks_count: feedbacks.length,
        });
      }
    }
  }, [feedbacks]);

  const filteredCards = dataCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const testSentry = () => {
    // Test 1: Capture d'exception
    Sentry.captureException(new Error("Test Sentry Exception"));

    // Test 2: Message simple
    Sentry.captureMessage("Test Sentry Message", "info");

    // Test 3: Erreur JavaScript
    setTimeout(() => {
      throw new Error("Test Sentry Uncaught Error");
    }, 100);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress sx={{ color: "#20b4dc" }} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Chargement des données...
        </Typography>
      </Box>
    );
  }

  if (error) {
    // Enhanced error logging for JSON parsing issues
    const errorMessage =
      typeof error === "string" ? error : error.message || "Unknown error";

    SentryLogger.logError(new Error(errorMessage), {
      component: "Dashboard",
      context: "data_loading_error",
      error_type: errorMessage.includes("Unexpected token")
        ? "json_parse_error"
        : "general_error",
      is_html_response:
        errorMessage.includes("<!doctype") || errorMessage.includes("<html"),
      original_error: error,
    });

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          {errorMessage.includes("Unexpected token")
            ? "Erreur de connexion au serveur - Veuillez réessayer"
            : errorMessage}
        </Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Recharger la page
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    SentryLogger.logUserAction("tab_changed", "Dashboard", {
      from_tab: tabValue,
      to_tab: newValue,
    });
    setTabValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Navbar onSearch={setSearchTerm} />

      {/* ✅ Bouton de test Sentry amélioré */}
      <Box sx={{ mb: 2 }}>
        <button onClick={testSentry}>Break the world</button>
      </Box>

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
              "&.Mui-selected": { color: "#20b4dc" },
            }}
          />
          <Tab
            icon={<TableChartIcon />}
            label="TABLEAU DÉTAILLÉ"
            sx={{
              color: tabValue === 1 ? "#20b4dc" : "text.secondary",
              "&.Mui-selected": { color: "#20b4dc" },
            }}
          />
        </Tabs>
      </Box>

      {/* Votre code existant pour les onglets... */}
      {tabValue === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "lg",
              px: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ mr: 2, whiteSpace: "nowrap" }}
            >
              <span style={{ color: "#20b4dc", fontWeight: "bold" }}>
                Aperçu des données ({feedbacks.length} feedbacks)
              </span>
            </Typography>
            <Box
              sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #20b4dc" }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            alignItems="center"
          >
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

      {tabValue === 1 && (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <FeedbackTable feedbacks={feedbacks} />
        </Container>
      )}
    </Box>
  );
};

// ✅ Exporter le composant avec Sentry
const DashboardWithErrorBoundary = Sentry.withErrorBoundary(Dashboard, {
  fallback: ({ error, resetError }) => {
    SentryLogger.logError(error, {
      component: "Dashboard",
      context: "error_boundary_triggered",
      error_name: error.name,
      error_stack: error.stack,
    });

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Une erreur s'est produite: {error.message}
        </Typography>
        <Button variant="contained" onClick={resetError}>
          Réessayer
        </Button>
      </Box>
    );
  },
  beforeCapture: (scope, error, hint) => {
    scope.setTag("error_boundary", "Dashboard");
    scope.setExtra("component_state", "error_boundary_triggered");
    scope.setExtra("error_hint", hint);
  },
});

export default DashboardWithErrorBoundary;
