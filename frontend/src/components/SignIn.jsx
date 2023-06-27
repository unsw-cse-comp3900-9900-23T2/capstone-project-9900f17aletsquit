import React from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';

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

function SignIn ({ onSuccess }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function login () {
    const response = await fetch('http://localhost:8800/user/login', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        password,
        username,
      }),
    });
    const data = await response.json();
    onSuccess(data.token);
    navigate('/dashboard');
  }

  return (
    <>
      <div style={styles2}><h2>Car Space Renting</h2></div>
      <div style={styles.container}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.textField}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.textField}
        />
        <Button variant="outlined" onClick={login} style={styles.button}>
          Sign in
        </Button>
        <hr />
        <Link to="/signup">Not yet a user? Sign up now</Link>
        <Link to="/adminsignin">Admin Click Here</Link>
      </div>
    </>
  );
}

export default SignIn;
