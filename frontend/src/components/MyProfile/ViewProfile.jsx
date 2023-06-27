import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, Avatar, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function MyProfile () {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  // const [birthday, setBirthday] = useState('');
  // const [photo, setPhoto] = useState(null);

  const email = useState('hanchengxuan98@gmail.com');
  const password = useState('1232445');
  const name = useState('Chengxuan Han');
  const birthday = useState('1998-09-30');
  const photo = useState(null);

  const navigate = useNavigate();

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleBirthdayChange = (e) => {
  //   setBirthday(e.target.value);
  // };

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   setPhoto(file);
  // };

  return (
    <>
      <form>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <label htmlFor="photo-upload">
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <IconButton component="span">
              {photo[0]
                ? (
                  <Avatar src={URL.createObjectURL(photo[0])} />
                )
                : (
                  <AccountCircleIcon fontSize="large" />
                )}
            </IconButton>
          </label>
        </Box>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          required
          fullWidth
          margin="normal"
        />

        <Box display="flex" justifyContent="flex-start" alignItems="center" marginBottom={2}>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            required
            margin="normal"
          />

          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <TextField
            label="Birthday"
            variant="outlined"
            type="date"
            value={birthday}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { max: new Date().toISOString().split('T')[0] },
            }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" onClick={() => {
          navigate('/editmyprofile');
        }}>
          Edit
        </Button>
      </form>
    </>
  );
}

export default MyProfile;
