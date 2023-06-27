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

function SignUp ({ onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  async function register () {
    const response = await fetch('http://localhost:5005/admin/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.textField}
        />
        <TextField
          required
          id="outlined-required"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.textField}
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
