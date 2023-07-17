import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box, Grid, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';

function MySpotDetail () {
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState({});
  const carSpace = location.state?.carSpace;

  const navigate = useNavigate();

  const handleGeolocationError = (error) => {
    console.error('Error getting geolocation:', error);
  };

  async function getCoordinatesFromAddress (address) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address.replace(/\s+/g, '+')
        )}&key=AIzaSyA-iW-2jlSRzjzw5MJxW3z9oeKS-xgPKuQ`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error('Unable to geocode the address.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }

  const handleGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Return distance in kilometers with 2 decimal places
  };

  useEffect(() => {
    const updateDistances = async () => {
      if (userLocation) {
        const updatedDistances = {};
        const { lat: userLat, lng: userLng } = userLocation;
        const { lat: carLat, lng: carLng } = await getCoordinatesFromAddress(carSpace.address);
        if (carLat && carLng) {
          const distance = calculateDistance(userLat, userLng, carLat, carLng);
          updatedDistances[carSpace.carSpaceId] = distance;
        }
        setDistances(updatedDistances);
      }
    };
    updateDistances();
  }, [carSpace.address, userLocation]);

  const renderDistance = () => {
    const distance = distances[carSpace.carSpaceId];
    if (distance) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsRunIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', marginRight: '4px', fontSize: '2.0rem' }} />
          <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>{distance} km away</Typography>
        </Box>
      );
    }
    return null;
  };

  const handleGoBack = () => {
    navigate('/myspot');
  };

  return (
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={2} />
      <Grid item xs={12} sm={8}>
        <Box display="flex" justifyContent="center" alignItems="center" height="70%">
          <Avatar
            src={carSpace.carspaceimage}
            sx={{ width: '800px', height: '600px', marginBottom: '16px' }}
            variant="square"
          />
          <Box sx={{ position: 'absolute', top: '10%', left: '15%' }}>
            <IconButton color="inherit" onClick={handleGoBack}>
              <Fab color="primary" aria-label="back">
                <ArrowBackIcon fontSize="large" />
              </Fab>
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3">
              {carSpace.address}
            </Typography>
            {renderDistance()}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Rating
              name={`carSpace-rating-${carSpace.carSpaceId}`}
              value={carSpace.totalrank}
              precision={0.5}
              readOnly
              sx={{ fontSize: '2.5rem' }}
            />
          </Box>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            Number of Ratings: {carSpace.ranknum}
          </Typography>
          <Typography variant="body1">
            Size: {carSpace.size}
          </Typography>
          <Typography variant="body1">
            {carSpace.type}
          </Typography>
          <Accordion sx={{ marginTop: '16px' }}>
            <AccordionSummary>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Comments
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {carSpace.curcomment}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      <Grid item xs={12} sm={2} />
    </Grid>
  );
}

export default MySpotDetail;
