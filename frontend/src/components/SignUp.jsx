import React from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Button from './Buttons';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  textField: {
    marginBottom: '10px',
  },
  button: {
    marginBottom: '20px',
  },
};

const styles2 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  marginTop: '10px',
};

function SignUp ({ onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [upassword, setUpassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [birthday, setBirthday] = React.useState('');

  const navigate = useNavigate();

  async function register () {
    const response = await fetch('http://localhost:8800/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        upassword,
      }),
    });
    const data = await response.json();
    onSuccess(data.token);
    navigate('/dashboard');
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  return (
    <>
      <div style={styles2}><h2>Car Space Renting</h2></div>
      <div style={styles.container}>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <label htmlFor="photo-upload">
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <IconButton component="span">
              {photo
                ? (
                  <Avatar src={URL.createObjectURL(photo)} />
                )
                : (
                  <AccountCircleIcon fontSize="large" />
                )}
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
        </Box>
        <TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.textField}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={upassword}
          onChange={(e) => setUpassword(e.target.value)}
          style={styles.textField}
        />
        <TextField
          required
          id="outlined-required"
          label="Name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.textField}
        />
        <TextField
          label="Birthday"
          variant="outlined"
          type="date"
          value={birthday}
          onChange={handleBirthdayChange}
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { max: new Date().toISOString().split('T')[0] },
          }}
        />
        <Button variant="outlined" onClick={register} style={styles.button}>
          Sign up
        </Button>
        <hr />
        <Link to="/signin">Already a user? Sign in now</Link>
      </div>
    </>
  );
}

export default SignUp;
