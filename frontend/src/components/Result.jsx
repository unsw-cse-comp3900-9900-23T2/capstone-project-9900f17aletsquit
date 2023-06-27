import React from 'react';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function Result ({ token }) {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = React.useState('');
  const [resultSet, setresultSet] = React.useState([]);
  const [showResult, setshowResult] = React.useState(false);
  // const [playerName, setPlayerName] = React.useState(null);
  // const [answerStatus, setanswerStatus] = React.useState(false);

  async function GetResult ({ sessionId }) {
    console.log(sessionId);
    const response = await fetch(`http://localhost:5005/admin/session/${sessionId}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        sessionid: sessionId
      })
    })
    const data = await response.json();
    setresultSet(data);
  }

  return (
    <>
      <TextField id="outlined-basic" label="Enter the sessionID you want to review" variant="outlined" onChange={(e) => setSessionId(e.target.value)} /><br /><br />
      <Button variant="contained" onClick={() => {
        console.log(':(', sessionId);
        GetResult({ sessionId });
        setshowResult(!showResult);
      }}>Confrim</Button>
      {resultSet?.map(result => (
        <>
          <b>
            <br />
            Player Name: {result.name}<br /><br />
            Answer: {result.answers}<br /><br />
          </b>
        </>
      )) }
      <Button variant="contained" onClick={() => {
        navigate('/dashboard');
      }}>End</Button>
    </>
  )
}

export default Result;
