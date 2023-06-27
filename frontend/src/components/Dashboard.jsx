import React from 'react';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// import EditQustion from './components/EditQuestion';

function Dashboard ({ token }) {
  const [showNewgame, setShowNewgame] = React.useState(false);
  const [showEditgame, setShowEditgame] = React.useState(false);
  const [showCurrEditgame, setShowCurrEditgame] = React.useState(null);
  const [showCurrgame, setShowCurrgame] = React.useState(null);
  const [startCurrgame, setStartCurrgame] = React.useState(null);
  const [endCurrgame, setEndCurrgame] = React.useState(null);
  const [showModalStart, setShowModalStart] = React.useState(false);
  const [showModalEnd, setShowModalEnd] = React.useState(false);
  const [showQuizInfo, setShowQuizInfo] = React.useState(false);
  const [quizzes, setQuizzes] = React.useState([]);
  // const [quizowner, setQuizOwner] = React.useState('');
  // const [quizCreateTime, setQuizCreateTime] = React.useState('');
  const [thumbNail, setthumbNail] = React.useState('');
  const [newQuizName, setNewQuizName] = React.useState('');
  const [startopen, setStartOpen] = React.useState(false);
  const [endopen, setEndOpen] = React.useState(false);
  const handleOpenStart = () => setStartOpen(true);
  const handleCloseStart = () => setStartOpen(false);
  const handleOpenEnd = () => setEndOpen(true);
  const handleCloseEnd = () => setEndOpen(false);
  const [newQuizQuestion, setNewQuizQuestion] = React.useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file).then((base64Str) => {
      setthumbNail(base64Str);
    })
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const deleteQuestion = (index) => {
    setNewQuizQuestion(prevQuestions => prevQuestions.filter((_, i) => i !== index));
  };

  const editQuestion = (index) => {
    navigate('/editquestion', { state: { questionIndex: index } });
  };

  const addQuestion = () => {
    setNewQuizQuestion(prevQuestions => [...prevQuestions, '']);
  };

  async function fetchAllQuizzes () {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    setQuizzes(data.quizzes);
  }

  React.useEffect(async () => {
    await fetchAllQuizzes();
  }, [quizzes]);

  async function creatNewGame () {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newQuizName
      })
    });
    setShowNewgame(false);
  }

  async function deleteQuiz ({ quizId }) {
    console.log(quizId);
    await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        quizid: quizId,
      })
    });
  }

  async function fetchOneQuiz ({ quizId }) {
    console.log(quizId);
    const response2 = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        quizid: quizId,
      })
    })
    const quizdata = await response2.json();
    console.log(quizdata);
    setShowQuizInfo(!showQuizInfo);
  }

  async function EditOneQuiz ({ quizId }) {
    console.log(quizId);
    await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        quizid: quizId,
      }),
      body: JSON.stringify({
        questions: newQuizQuestion,
        name: newQuizName,
        thumbnail: thumbNail
      })
    })
    setShowEditgame(false);
    console.log('11111111111');
  }

  async function StartQuiz ({ quizId }) {
    console.log(quizId);
    await fetch(`http://localhost:5005/admin/quiz/${quizId}/start`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        quizid: quizId,
      })
    });
  }

  async function EndQuiz ({ quizId }) {
    console.log(quizId);
    await fetch(`http://localhost:5005/admin/quiz/${quizId}/end`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      path: JSON.stringify({
        quizid: quizId,
      })
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>hey here are all the carspaces!</h2>
      </div><br />
      <br />{quizzes?.map(quiz => (
        <>
          <hr /><b><h3>{quiz.name}</h3></b><br/>
          {/* delete button */}
          <Button variant="outlined" onClick={() => deleteQuiz({ quizId: quiz.id })}> x</Button>

          {/* show quiz info button */}
          <Button variant="outlined" onClick={() => {
            fetchOneQuiz({ quizId: quiz.id });
            setShowCurrgame(quiz.id);
          }}>
            {/* show quiz info process */}
            {showQuizInfo && showCurrgame === quiz.id ? 'Hide' : 'Show'} quiz info</Button>

          {/* edit button */}
          <Button variant="outlined" onClick={() => {
            setShowEditgame(!showEditgame);
            setShowCurrEditgame(quiz.id);
          }}>
            {showEditgame && showCurrEditgame === quiz.id ? 'cancel' : 'start'} edit quiz content </Button>

          <br/>
          {/* start quiz button */}
          <Button variant="contained" onClick={() => {
            handleOpenStart();
            StartQuiz({ quizId: quiz.id });
            setStartCurrgame(quiz.id);
            setShowModalStart(true);
            console.log('oldSessions', quiz.oldSessions);
          }}>Start</Button>

          {/* after click start, popup and copy link for session ID */}
          {showModalStart && startCurrgame === quiz.id && (
            <div>
              <Modal
                open={startopen}
                onClose={handleCloseStart}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    This the sesion ID for your game:
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <h2>Session ID: {quiz.oldSessions}</h2>
                    <Button variant="outlined" onClick={() => {
                      navigator.clipboard.writeText(`http://yourwebsite.com/play?sessionId=${quiz.oldSessions}`);
                      // you can also show a snackbar or tooltip to indicate that the link has been copied
                    }}>Copy Link</Button>
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}

          {/* start quiz button */}
          <Button variant="contained" onClick={() => {
            handleOpenEnd();
            EndQuiz({ quizId: quiz.id });
            setEndCurrgame(quiz.id);
            setShowModalEnd(true);
          }}>End</Button>

          {/* after click END, popup and show result */}
          {showModalEnd && endCurrgame === quiz.id && (
            <div>
              <Modal
                open={endopen}
                onClose={handleCloseEnd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Would you like to view the results?
                  </Typography>
                  <Button variant="outlined" onClick={() => {
                    navigate('/result');
                  }}>Yes!</Button>
                </Box>
              </Modal>
            </div>
          )}
          <br /><br />
          {showQuizInfo && showCurrgame === quiz.id && (
            <b>
              <br/>Owner is {quiz.owner}
              <br/>Created at {quiz.createdAt}
              <br/>
              <img
                src={quiz.thumbnail}
                alt="quiz thumbnail"
                width={200}
                height={200}
              />
            </b>
          )}
          {showEditgame && showCurrEditgame === quiz.id && (
            <b>
              <br/>
                Edit the new game!<br/><br />
                &nbsp;<TextField required id="outlined-required" label="Name" variant="outlined" value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)} /><br /><br />
                Upload Photo for the game: <input type="file" onChange={handleImageChange} /><br /><br />
              {newQuizQuestion.map((question, index) => (
                <div key={index}>
                  {/* edit question button, go the edit screen */}
                  <Button variant="outlined" onClick={() => editQuestion(index)}>Edit question content</Button>
                  {/* delete question button */}
                  <Button variant="outlined" onClick={() => deleteQuestion(index)}>Delete question</Button>
                </div>
              ))}
              {/* add question button */}
              <Button variant="outlined" onClick={() => addQuestion()}>Add a question</Button><br />
              <Button variant="outlined" onClick={() => EditOneQuiz({ quizId: quiz.id })}>Edit done!</Button>
            </b>
          )}
          <br /><br />
        </>
      ))}
      <br /><hr /><br />

      {/* show new game button */}
      <Button variant="outlined" onClick={() => setShowNewgame(!showNewgame)}>
        {showNewgame ? 'Hide' : 'Show'} My car space!
      </Button>
      {showNewgame && (
        <>
          <br />
          car space!<br />
          Name: <input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)} />
          {/* Question: <input value={newQuizQuestion} onChange={(e) => setNewQuizQuestion(e.target.value)} /> */}
          <Button variant="outlined" onClick={creatNewGame}>Release my car space!</Button>
        </>
      )}
    </>
  )
}

export default Dashboard;
