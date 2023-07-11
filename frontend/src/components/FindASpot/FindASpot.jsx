import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box, Paper, Grid, Button } from '@mui/material';
import Rating from '@mui/material/Rating';

function FindASpot () {
  const [carSpaces, setCarSpaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  async function fetchCarSpaces () {
    const response = await fetch('http://127.0.0.1:8800/carspace/queryAll');
    const data = await response.json();
    setCarSpaces(data);
  }

  useEffect(() => {
    fetchCarSpaces();
  }, []);

  useEffect(() => {
    if (!isGoogleMapsLoaded) {
      loadGoogleMapsAPI().then(() => {
        setIsGoogleMapsLoaded(true);
      });
    }
  }, [isGoogleMapsLoaded]);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 10,
      });

      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          title: 'Your Location',
        });
        userMarker.setMap(map);
        map.setCenter(userLocation);
      }

      carSpaces.forEach((carSpace) => {
        const { lat, lng } = getCoordinatesFromAddress(carSpace.address);

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          title: carSpace.address,
          map: map,
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: getCarSpaceInfoWindowContent(carSpace),
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    }
  }, [carSpaces, userLocation, isGoogleMapsLoaded]);

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
      console.error('Error:', error.message);
      // Handle the error gracefully
      return null;
    }
  }

  const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-iW-2jlSRzjzw5MJxW3z9oeKS-xgPKuQ&callback=initMap';
        script.async = true;
        script.defer = true;
        script.onerror = reject;
        window.initMap = resolve;
        document.head.appendChild(script);
      }
    });
  };

  const handleGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
  };

  const handleGeolocationError = (error) => {
    console.error('Error getting geolocation:', error.message);
    // Handle the error gracefully
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getCarSpaceInfoWindowContent = (carSpace) => {
    return `
      <div>
        <Typography variant="body1">${carSpace.address}</Typography>
        <Typography variant="body2">${carSpace.size}</Typography>
        <Typography variant="body2">${carSpace.type}</Typography>
        <Rating name="carSpace-rating" value={${carSpace.totalrank}} precision={0.5} readOnly />
        <Typography variant="body2">Number of Ratings: ${carSpace.ranknum}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button variant="contained" color="primary">
            Book for ${carSpace.price}/hour
          </Button>
        </Box>
      </div>
    `;
  };

  return (
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={3} sx={{ zIndex: 1, overflow: 'auto' }}>
        {carSpaces.map((carSpace) => (
          <Paper
            key={carSpace.carSpaceId}
            elevation={3}
            sx={{
              padding: '20px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar src={carSpace.carspaceimage} sx={{ width: '120px', height: '120px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {carSpace.address}
              </Typography>
              <Typography variant="body2">{carSpace.size}</Typography>
              <Typography variant="body2">{carSpace.type}</Typography>
              <Rating
                name={`carSpace-rating-${carSpace.carSpaceId}`}
                value={carSpace.totalrank}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2">Number of Ratings: {carSpace.ranknum}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button variant="contained" color="primary">
                Book for {carSpace.price}/hour
              </Button>
            </Box>
          </Paper>
        ))}
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </Grid>
    </Grid>
  );
}

export default FindASpot;
