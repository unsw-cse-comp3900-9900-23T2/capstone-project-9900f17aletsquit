import React, { useState } from 'react';
import { Typography, IconButton, Avatar, Box, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function ViewMyProfile ({ token }) {
  const [email, setEmail] = useState('');
  const [upassword, setUpassword] = useState('');
  const [username, setUserame] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userImage, setUserImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  async function getProfile (token) {
    console.log('123');
    console.log(`token:${localStorage.token}`);
    const response = await fetch('http://127.0.0.1:8800/user/sendProfile', {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setEmail(data.email);
    setUpassword(data.upassword);
    setUserame(data.username);
    setBirthday(data.birthday.split('T')[0]);
    setUserImage(data.userimage);
    console.log('done!');
    console.log(`email: ${email}`);
    console.log(`pwd: ${upassword}`);
    console.log(`username: ${username}`);
    console.log(`birthday: ${birthday}`);
    console.log(`userimage: ${userImage}`);
  }

  // 调用 getProfile 函数以初始化变量的值
  getProfile(token);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <form>
        <Box textAlign="right" marginTop={-2} marginRight={2}>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => {
              navigate('/editmyprofile');
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center" marginBottom={2}>
          <label style={{ pointerEvents: 'none' }}>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <IconButton component="span" onClick={null}>
              {userImage[0]
                ? (
                  <Avatar src={`data:image/jpeg;base64,${userImage}`} />
                )
                : (
                  <AccountCircleIcon fontSize="large" />
                )}
            </IconButton>
          </label>
        </Box>

        <Box marginBottom={2} textAlign="center">
          <Typography variant="h5" marginBottom="3%">{username}</Typography>
        </Box>

        <Box marginBottom={2} textAlign="center">
          <Typography variant="body1" marginBottom="3%">
            <strong>Email:</strong> {email}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" marginBottom={2} textAlign="center">
          <Typography variant="body1" component="span" marginRight={1}>
            <strong>Password:</strong>
          </Typography>
          <Box flexGrow={1}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={upassword}
              fullWidth
              readOnly
              onClick={() => {}}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} onMouseDown={(e) => e.preventDefault()}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
              margin="none"
            />
          </Box>
        </Box>

        <Box marginBottom={2} textAlign="center">
          <Typography variant="body1" marginBottom="3%">
            <strong>Birthday:</strong> {birthday}
          </Typography>
        </Box>
      </form>
    </>
  );
}

export default ViewMyProfile;
