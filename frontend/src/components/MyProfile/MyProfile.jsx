import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function MyProfile ({ token }) {
  const [email, setEmail] = useState('');
  const [upassword, setUpassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userimage, setUserimage] = useState(null);

  const navigate = useNavigate();

  async function editProfile () {
    console.log('123');
    console.log(`token:${token}`);
    await fetch('http://127.0.0.1:8800/user/editProfile', {
      method: 'PUT',
      headers: {
        token: localStorage.token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        userimage,
        upassword,
        birthday,
      }),
    });
    navigate('/myprofile')
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUpassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  function fileToDataUrl (file) {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file).then((base64Str) => {
      setUserimage(base64Str);
      console.log(`:pspsps${base64Str}`);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
    console.log({
      email,
      upassword,
      username,
      birthday,
      userimage,
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
              {userimage
                ? (
                  <Avatar src={userimage} />
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
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={upassword}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />

        <Box display="flex" justifyContent="flex-start" alignItems="center" marginBottom={2}>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            value={username}
            onChange={handleNameChange}
            margin="normal"
          />

          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <TextField
            label="Birthday"
            variant="outlined"
            type="date"
            value={birthday}
            onChange={handleBirthdayChange}
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
