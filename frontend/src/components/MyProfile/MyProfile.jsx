import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function MyProfile () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      name,
      birthday,
      photo,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
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
            onChange={handleNameChange}
            required
            margin="normal"
          />

          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

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
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button> &nbsp;&nbsp;&nbsp;
        <Button type="submit" variant="contained" color="primary" onClick={() => {
          navigate('/myprofile');
        }}>
          Cancel
        </Button>
      </form>
    </>
  );
}

export default MyProfile;
