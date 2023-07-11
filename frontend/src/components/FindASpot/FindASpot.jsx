import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box, Paper, Grid, Button } from '@mui/material';
import Rating from '@mui/material/Rating';

function FindASpot () {
  const [carSpaces, setCarSpaces] = useState([]);

  async function fetchCarSpaces () {
    const response = await fetch('http://127.0.0.1:8800/carspace/queryAll');
    const data = await response.json();
    setCarSpaces(data);
  }

  useEffect(() => {
    fetchCarSpaces();
  }, []);

  useEffect(() => {
    if (window.google && carSpaces.length > 0) {
      const markers = carSpaces.map((carSpace) => {
        const { lat, lng } = getCoordinatesFromAddress(carSpace.address);

        return new window.google.maps.Marker({
          position: { lat, lng },
          title: carSpace.address
        });
      });

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 10
      });

      markers.forEach((marker) => {
        marker.setMap(map);
      });
    }
  }, [carSpaces]);

  async function getCoordinatesFromAddress (address) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyA-iW-2jlSRzjzw5MJxW3z9oeKS-xgPKuQ`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Unable to geocode the address.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error gracefully
      return null;
    }
  }

  const renderCarSpaces = () => {
    return carSpaces.map((carSpace) => (
      <Grid item xs={6} key={carSpace.carSpaceId}>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={carSpace.carspaceimage} sx={{ width: '120px', height: '120px' }} />

            <Typography variant="body1">{carSpace.address}</Typography>
            <Typography variant="body2">{carSpace.size}</Typography>
            <Typography variant="body2">{carSpace.type}</Typography>

            <Rating name="carSpace-rating" value={carSpace.totalrank} precision={0.5} readOnly />
            <Typography variant="body2">Number of Ratings: {carSpace.ranknum}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" color="primary">
                Book for {carSpace.price}/hour
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {renderCarSpaces()}
      </Grid>
      <Grid item xs={6}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </Grid>
    </Grid>
  );
}

export default FindASpot;
