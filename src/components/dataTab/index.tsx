import { useState, useMemo } from "react";
import {
  Box, Paper, Typography, Chip, Avatar, Tooltip,
  FormControl, InputLabel, Select, MenuItem,
  Slider, Stack, useMediaQuery, useTheme,
  LinearProgress, IconButton, Card, CardContent
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Mail as MailIcon,
  Forum as ForumIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Web as WebIcon,
  ViewModule as GridViewIcon,
  ViewList as TableViewIcon,
  SentimentVerySatisfied as PositiveIcon,
  SentimentNeutral as NeutralIcon,
  SentimentVeryDissatisfied as NegativeIcon
} from "@mui/icons-material";

const FeedbackTable = ({ feedbacks = [] }) => {
  const [viewMode, setViewMode] = useState("table");
  const [channelFilter, setChannelFilter] = useState("all");
  const [sentimentRange, setSentimentRange] = useState([-1, 1]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pageSize, setPageSize] = useState(10);
  
  // Configuration des canaux avec leurs icônes et couleurs
  const channelConfig = {
    Twitter: { icon: <TwitterIcon />, color: "#1DA1F2" },
    YouTube: { icon: <YouTubeIcon />, color: "#FF0000" },
    mail: { icon: <MailIcon />, color: "#EA4335" },
    Facebook: { icon: <FacebookIcon />, color: "#4267B2" },
    Instagram: { icon: <InstagramIcon />, color: "#E1306C" },
    Forum: { icon: <ForumIcon />, color: "#FF9800" },
    Web: { icon: <WebIcon />, color: "#2196F3" }
  };
  
  // Calculer la liste des canaux uniques pour le filtre
  const uniqueChannels = useMemo(() => {
    const channels = new Set(feedbacks.map(item => item.channel));
    return Array.from(channels);
  }, [feedbacks]);
  
  // Filtrer les données selon les critères
  const filteredData = useMemo(() => {
    return feedbacks.filter(item => {
      const matchesChannel = channelFilter === "all" || item.channel === channelFilter;
      const sentiment = typeof item.sentiment === "number" ? item.sentiment : 0;
      const matchesSentiment = sentiment >= sentimentRange[0] && sentiment <= sentimentRange[1];
      return matchesChannel && matchesSentiment;
    });
  }, [feedbacks, channelFilter, sentimentRange]);
  
  // Fonction pour générer une puce de canal avec avatar et icône
  const getChannelChip = (channel) => {
    const config = channelConfig[channel] || { icon: <ForumIcon />, color: "#757575" };
    
    return (
      <Chip
        avatar={
          <Avatar sx={{ bgcolor: `${config.color}!important` }}>
            {config.icon}
          </Avatar>
        }
        label={channel}
        sx={{
          fontWeight: 500,
          color: "white",
          backgroundColor: config.color,
        }}
      />
    );
  };
  
  // Fonction pour afficher le texte tronqué avec tooltip
  const TextDisplay = ({ text, maxLength = 100 }) => {
    const truncated = text.length > maxLength;
    const displayText = truncated ? `${text.slice(0, maxLength)}...` : text;
    
    return (
      <Tooltip title={truncated ? text : ""} arrow placement="top">
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "80px",
            fontFamily: "Roboto, sans-serif",
            lineHeight: 1.5,
          }}
        >
          {displayText}
        </Typography>
      </Tooltip>
    );
  };
  
  // Fonction pour visualiser le sentiment
  const SentimentDisplay = ({ score }) => {
    // Assign a category based on the sentiment score
    let category, color, icon;
    
    if (score > 0.3) {
      category = "Positif";
      color = "#4caf50";
      icon = <PositiveIcon />;
    } else if (score < -0.3) {
      category = "Négatif";
      color = "#f44336";
      icon = <NegativeIcon />;
    } else {
      category = "Neutre";
      color = "#ff9800";
      icon = <NeutralIcon />;
    }
    
    // Normalize score to 0-100 for LinearProgress
    const normalizedScore = ((score + 1) / 2) * 100;
    
    return (
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Box sx={{ color }}>{icon}</Box>
          <Typography variant="body2" sx={{ color }}>{category}</Typography>
          <Typography variant="caption">({score.toFixed(2)})</Typography>
        </Stack>
        
        <LinearProgress
          variant="determinate"
          value={normalizedScore}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: "#f5f5f5",
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, #f44336 0%, #ff9800 50%, #4caf50 100%)`,
              borderRadius: 5,
            },
          }}
        />
      </Box>
    );
  };
  
  // Configuration des colonnes pour DataGrid
  const columns = [
    {
      field: "channel",
      headerName: "Canal",
      width: 150,
      renderCell: (params) => getChannelChip(params.value),
      filterable: true,
    },
    {
      field: "text",
      headerName: "Commentaire",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <TextDisplay text={params.value} />,
    },
    {
      field: "sentiment",
      headerName: "Sentiment",
      width: 200,
      renderCell: (params) => <SentimentDisplay score={params.value || 0} />,
      sortable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    }
  ];
  
  // Vue en tableau avec DataGrid
  const TableView = () => (
    <DataGrid
      rows={filteredData}
      columns={columns}
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 25, 50]}
      autoHeight
      disableSelectionOnClick
      components={{
        Toolbar: GridToolbar,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      density="standard"
      sx={{
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "rgba(32, 180, 220, 0.08)",
        },
      }}
    />
  );
  
  // Vue en cartes
  const CardView = () => (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
      {filteredData.map((feedback) => (
        <Card key={feedback.id} elevation={3} sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              {getChannelChip(feedback.channel)}
              <Typography variant="caption" color="text.secondary">
                {new Date(feedback.date).toLocaleString()}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3, minHeight: "80px" }}>
              <TextDisplay text={feedback.text} maxLength={150} />
            </Box>
            
            <SentimentDisplay score={feedback.sentiment || 0} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
  
  return (
    <Paper sx={{ p: 3, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Tableau de feedback</Typography>
        <Box>
          <IconButton onClick={() => setViewMode("table")} color={viewMode === "table" ? "primary" : "default"}>
            <TableViewIcon />
          </IconButton>
          <IconButton onClick={() => setViewMode("grid")} color={viewMode === "grid" ? "primary" : "default"}>
            <GridViewIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems={isMobile ? "stretch" : "center"}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="channel-filter-label">Canal</InputLabel>
            <Select
              labelId="channel-filter-label"
              value={channelFilter}
              label="Canal"
              onChange={(e) => setChannelFilter(e.target.value)}
            >
              <MenuItem value="all">Tous les canaux</MenuItem>
              {uniqueChannels.map((channel) => (
                <MenuItem key={channel} value={channel}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {channelConfig[channel]?.icon || <ForumIcon />}
                    <Typography sx={{ ml: 1 }}>{channel}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ width: isMobile ? "100%" : 300, px: 2 }}>
            <Typography gutterBottom>Sentiment</Typography>
            <Slider
              value={sentimentRange}
              onChange={(e, newValue) => setSentimentRange(newValue)}
              min={-1}
              max={1}
              step={0.1}
              marks={[
                { value: -1, label: "Négatif" },
                { value: 0, label: "Neutre" },
                { value: 1, label: "Positif" },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value.toFixed(1)}
            />
          </Box>
          
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {filteredData.length} résultat{filteredData.length !== 1 ? "s" : ""}
          </Typography>
        </Stack>
      </Box>
      
      {viewMode === "table" ? <TableView /> : <CardView />}
    </Paper>
  );
};

export default FeedbackTable;