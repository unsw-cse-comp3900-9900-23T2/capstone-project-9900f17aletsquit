import React, { useState } from 'react';
import { Typography, Avatar, Box, Paper, Grid, Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useLocation, useNavigate } from 'react-router-dom';

function SpotBooking ({ token }) {
  const location = useLocation();
  const carSpace = location.state?.carSpace;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showComment, setShowComment] = useState(false);

  const navigate = useNavigate();

  const today = new Date().toLocaleDateString();

  if (!carSpace) {
    return null; // 处理未传递`carSpace`参数的情况
  }

  const renderDistance = () => {
    const distance = carSpace.distance;
    if (distance) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsRunIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', marginRight: '4px' }} />
          <Typography variant="body2">{distance} km away</Typography>
        </Box>
      );
    }
    return null;
  };

  //  async function bookSpot () {
  //   await fetch('http://127.0.0.1:8800/order/addOrder', {
  //       method: 'POST',
  //     // headers: {
  //     //   token: token,
  //     //   'Content-type': 'application/json',
  //     // },
  //     body: JSON.stringify({
  //       startDate,
  //       endDate,
  //       token,
  //       "providerId":1,
  //       "carSpaceId":1,
  //       "sum":200
  //     }),
  //   });
  //   navigate('/myspot');
  // }

  const handleBooking = (e) => {
    // e.preventDefault();
    // bookSpot();
    // 处理预订逻辑
  };

  const handleCancel = () => {
    navigate('/findaspot');
    // 处理取消逻辑
  };

  const handleToggleComment = () => {
    setShowComment((prevShowComment) => !prevShowComment);
  };

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
  };

  return (
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={2} />
      <Grid item xs={12} sm={8}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {/* Car Space Image */}
          <Avatar
            src={carSpace.carspaceimage}
            sx={{ width: '200px', height: '200px', marginBottom: '16px' }}
            variant="square"
          />
          {/* Car Space Details */}
          <Typography variant="h6" align="center">
            {carSpace.address}
          </Typography>
          <Typography variant="body2" align="center">
            Size: {carSpace.size}
          </Typography>
          <Typography variant="body2" align="center">
            {carSpace.type}
          </Typography>
          <Typography variant="body2" align="center">
            {carSpace.price}$ per hour
          </Typography>
          {renderDistance()}
          {/* Car Space Ratings */}
          <Rating
            name={`carSpace-rating-${carSpace.carSpaceId}`}
            value={carSpace.totalrank}
            precision={0.5}
            readOnly
            sx={{ marginTop: '16px' }}
          />
          <Typography variant="body2" align="center">
            Number of Ratings: {carSpace.ranknum}
          </Typography>
          {showComment && (
            <Box sx={{ marginTop: '16px' }}>
              <Typography variant="body2" align="center" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
                Comments:
              </Typography>
              <Typography variant="body2" align="center" sx={{ marginTop: '8px', marginBottom: '16px', fontStyle: 'italic' }}>
                {carSpace.curcomment}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleToggleComment}
            sx={{ marginTop: '16px' }}
          >
            {showComment ? 'Hide Comment' : 'Show Comment'}
          </Button>
          {/* Rental Dates */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
              Rental start date
            </Typography>
            <TextField
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              variant="outlined"
              size="small"
              sx={{ marginTop: '8px', marginBottom: '16px' }}
              fullWidth
            />
            <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
              Rental end date:
            </Typography>
            <TextField
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              variant="outlined"
              size="small"
              sx={{ marginTop: '8px', marginBottom: '16px' }}
              fullWidth
            />
          </Grid>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleBooking}>
              Book
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel} sx={{ marginLeft: '16px' }}>
              Cancel
            </Button>
          </Box>
          {/* Current Date ez */}
          <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
            Today Date: {today}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={2} />
    </Grid>
  );
}


export default SpotBooking;
