import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function MyBookings ({ token }) {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  async function fetchOrders () {
    // Fetch orders data from the API
    const response = await fetch(`http://127.0.0.1:8800/order/orderSearch?customerId=${token}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrders = () => {
    return orders.map((order) => (
      <Grid item xs={4} key={order.orderId}>
        <Box marginBottom="20px">
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              <Box textAlign="center" mt={2} mb={1}>
                <Typography variant="h6" component="span">
                  Rental Dates:
                </Typography>
                <Typography variant="body1" component="span">
                  {order.fromTime} - {order.toTime}
                </Typography>
              </Box>
              <Box textAlign="center" mb={1}>
                <Typography variant="body1" component="span">
                  Payment Price:
                </Typography>
                <Typography variant="body1" component="span">
                  {order.sum}
                </Typography>
              </Box>

              {/* Other order details here */}

              <Rating name="order-rating" value={order.curRank} precision={0.5} readOnly />

              <Box display="flex" justifyContent="center" mt="auto">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: '0 10px' }}
                  onClick={() => {
                    navigate(`/orderdetails/${order.orderId}`, { state: { order } });
                  }}
                >
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
      <Box paddingTop="64px">
        <Grid container spacing={2}>
          {renderOrders()}
        </Grid>
        
      </Box>
    </>
  );
}

export default MyBookings;
