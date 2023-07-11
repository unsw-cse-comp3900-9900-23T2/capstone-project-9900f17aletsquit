import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box, Paper, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function MySpot ({ token }) {
  const [carSpaces, setCarSpaces] = useState([]);

  const navigate = useNavigate();
  async function fetchCarSpaces () {
    // Fetch car spaces data from API
    const response = await fetch('http://127.0.0.1:8800/carspace/queryOwned', {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setCarSpaces(data);
  }

  useEffect(() => {
    fetchCarSpaces();
  }, []);

  const renderCarSpaces = () => {
    return carSpaces.map((carSpace) => (
      <Grid item xs={4} key={carSpace.carSpaceId}>
        <Box marginBottom="20px">
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              <Avatar src={carSpace.carspaceimage} sx={{ width: '120px', height: '120px' }} />

              <Box textAlign="center" mt={2} mb={1}>
                <Typography variant="h6" component="span">
                  Price:
                </Typography>
                <Typography variant="body1" component="span">
                  {carSpace.price}
                </Typography>
              </Box>
              <Box textAlign="center" mb={1}>
                <Typography variant="body1" component="span">
                  Address:
                </Typography>
                <Typography variant="body1" component="span">
                  {carSpace.address}
                </Typography>
              </Box>
              <Box textAlign="center" mb={1}>
                <Typography variant="body1" component="span">
                  Size:
                </Typography>
                <Typography variant="body1" component="span">
                  {carSpace.size}
                </Typography>
              </Box>
              <Box textAlign="center" mb={1}>
                <Typography variant="body1" component="span">
                  Type:
                </Typography>
                <Typography variant="body1" component="span">
                  {carSpace.type}
                </Typography>
              </Box>

              <Rating name="carSpace-rating" value={carSpace.totalrank} precision={0.5} readOnly />
              <Typography variant="body2">Number of Ratings: {carSpace.ranknum}</Typography>

              <Box display="flex" justifyContent="center" mt="auto">
                <Button variant="contained" color="primary" style={{ margin: '0 10px' }}>
                  View Details
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>
    ));
  };

  return (
    <>
      <Box position="fixed" bottom={10} right={10} zIndex={999}>
        <Fab color="primary" onClick={() => { navigate('/addspot'); }}>
          <AddIcon />
        </Fab>
      </Box>
      <Box paddingTop="64px">
        <Grid container spacing={2}>
          {renderCarSpaces()}
        </Grid>
      </Box>
    </>
  );
}

export default MySpot;
