import { Box, Button, Typography } from '@mui/material'

const Homepage = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Left Section */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f0f0f0"
        p={4}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Our Appli
        </Typography>
        <Button variant="contained" size="large">
          Login
        </Button>
      </Box>

      {/* Right Section */}
      <Box
        flex={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        bgcolor="#e0e0e0"
        p={2}
      >
        {[1, 2, 3, 4].map((n) => (
          <Box
            key={n}
            component="img"
            src={`https://via.placeholder.com/150?text=Image+${n}`}
            alt={`Placeholder ${n}`}
            sx={{ m: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Homepage
