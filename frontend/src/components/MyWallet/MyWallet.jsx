import React, { useState } from 'react';
import { Typography, Avatar, Box, Paper, Grid, Button, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmailIcon from '@mui/icons-material/Email';

function MyWallet ({ token }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');
  const [walletExtra1, setWalletExtra1] = useState(0.0);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [ccv, setCcv] = useState('');
  const [topup, setTopup] = useState('');

  async function getProfile () {
    const response = await fetch('http://127.0.0.1:8800/user/sendProfile', {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setEmail(data.email);
    setUsername(data.username);
    setUserImage(data.userimage);
    setWalletExtra1(parseFloat(data.walletExtra));
  }

  React.useEffect(() => {
    getProfile(token);
  }, [token]);

  const topup1 = parseInt(topup, 10);
  const walletExtra = topup1 + walletExtra1;

  async function recharge () {
    console.log(topup1);
    console.log(walletExtra1);
    await fetch('http://127.0.0.1:8800/user/editProfile', {
      method: 'PUT',
      headers: {
        token: token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        walletExtra,
      }),
    });
  }

  const handleRecharge = () => {
    recharge();
    // Perform the recharge logic here
    // You can access the cardNumber, cardName, and ccv values to process the recharge
  };

  const validateCardNumber = (value) => {
    const numericValue = value.replace(/\s/g, '').replace(/\D/g, ''); // Remove spaces and non-digit characters
    let formattedValue = '';
    for (let i = 0; i < numericValue.length; i += 4) {
      formattedValue += numericValue.slice(i, i + 4) + ' ';
    }
    formattedValue = formattedValue.trim(); // Remove trailing space
    setCardNumber(formattedValue);
  };

  const validateCCV = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters
    if (numericValue.length <= 3) {
      setCcv(numericValue);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: '40px', maxWidth: '800px', display: 'flex' }}>
        <Box flex="1">
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
            <Avatar src={`${userImage}`} sx={{ width: '120px', height: '120px' }}>
              {!userImage && <AccountCircleIcon fontSize="large" />}
            </Avatar>
            <Typography variant="h5" marginTop="10px">
              {username}
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <EmailIcon />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body1">{email}</Typography>
            </Grid>

            <Grid item xs={1}>
              <AccountBalanceWalletIcon />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body1"> You have {walletExtra1} remaining.</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box flex="1" marginLeft={2}>
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
            <Typography variant="h6">Recharge Wallet</Typography>
            <TextField
              label="$"
              value={topup}
              onChange={(e) => setTopup(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) => validateCardNumber(e.target.value)}
              inputProps={{ maxLength: 19 }} // Increased the maximum length to accommodate spaces
              margin="normal"
            />
            <TextField
              label="Account Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="CCV"
              value={ccv}
              onChange={(e) => validateCCV(e.target.value)}
              inputProps={{ maxLength: 3 }}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleRecharge} marginTop={2}>
              Confirm Recharge
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MyWallet;
