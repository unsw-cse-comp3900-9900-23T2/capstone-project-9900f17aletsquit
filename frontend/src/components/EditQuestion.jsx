import React from 'react';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';

function EditQuestion () {
  const navigate = useNavigate();
  const [timeLimit, setTimeLimit] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const [thumbNail, setthumbNail] = React.useState('');
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    textField: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

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

  const classes = useStyles();
  const [question, setQuestion] = React.useState('');
  const [options, setOptions] = React.useState([{ value: '', isCorrect: false }]);
  const [answerType, setAnswerType] = React.useState('single');

  const handleAddOption = () => {
    setOptions([...options, { value: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].value = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      question,
      options,
      answerType,
    });
  };

  return (
    <>
      <b>
        <br/>
        Edit the new game!<br/><br />
        <TextField required id="outlined-required" label="Name" variant="outlined" /><br /><br />
        Upload Photo:<br /><br /> <TextField required id="outlined-required" label="" variant="outlined" type="file" onChange={handleImageChange} /><br /><br />
        <br/>
        <img
          src={thumbNail}
          alt="quiz thumbnail"
          width={200}
          height={200}
        />
        <form onSubmit={handleSubmit}>
          <TextField
            required id="outlined-required"
            label="Question"
            fullWidth
            className={classes.textField}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          {options.map((option, index) => (
            <div key={index}>
            <TextField
                label={`Option ${index + 1}`}
                fullWidth
                className={classes.textField}
                value={option.value}
                onChange={(event) => handleOptionChange(event, index)}
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={option.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index)}
                />
                }
                label="Correct Answer"
            />
            <IconButton onClick={() => handleRemoveOption(index)}>
                <DeleteIcon />
            </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddOption}
            className={classes.button}
          >
            Add Option
          </Button>
          <TextField
            label="Time Limit (in seconds)"
            fullWidth
            margin="normal"
            type="number"
            value={timeLimit}
            onChange={(event) => setTimeLimit(parseInt(event.target.value))}
          />
          <TextField
            label="Score"
            fullWidth
            margin="normal"
            type="number"
            value={score}
            onChange={(event) => setScore(parseInt(event.target.value))}
          />
          <TextField
            label="URL"
            fullWidth
            margin="normal"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <RadioGroup
            value={answerType}
            onChange={(event) => setAnswerType(event.target.value)}
            >
            <FormControlLabel
                value="single"
                control={<Radio />}
                label="Single Answer"
            />
            <FormControlLabel
                value="multiple"
                control={<Radio />}
                label="Multiple Answers"
            />
            </RadioGroup>
          </FormControl><br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </form><br /><hr />
        <Button variant="outlined" onClick={() => {
          navigate('/dashboard');
        }}>Edit done!</Button>
      </b>
    </>
  )
}
// import Button from './Buttons';
// import { useNavigate } from 'react-router-dom';

// function EditQuestion ({ quiz }) {
//     const [thumbNail, setthumbNail] = React.useState('');
//     const [newQuizName, setNewQuizName] = React.useState('');
//     const [newQuizQuestion, setNewQuizQuestion] = React.useState([]);
//     const navigate = useNavigate();

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         fileToDataUrl(file).then((base64Str) => {
//           setthumbNail(base64Str);
//         })
//       };

//     function fileToDataUrl (file) {
//         const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
//         const valid = validFileTypes.find(type => type === file.type);
//         // Bad data, let's walk away.
//         if (!valid) {
//         throw Error('provided file is not a png, jpg or jpeg image.');
//         }
//         const reader = new FileReader();
//         const dataUrlPromise = new Promise((resolve, reject) => {
//         reader.onerror = reject;
//         reader.onload = () => resolve(reader.result);
//         });
//         reader.readAsDataURL(file);
//         return dataUrlPromise;
//     }

//     async function EditOneQuiz ({ quizId }) {
//     console.log(quizId);
//     await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
//         method: 'PUT',
//         headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         },
//         path: JSON.stringify({
//         quizid: quizId,
//         }),
//         body: JSON.stringify({
//         questions: newQuizQuestion,
//         name: newQuizName,
//         thumbnail: thumbNail
//         })
//     })
//     console.log('11111111111');
//     }

//     return (
//         <>
//             <b>
//                 <br/>
//                 Edit the new game!<br/>
//                 Name: <input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)} /><br />
//                 Question: <input value={newQuizQuestion} onChange={(e) => setNewQuizQuestion(e.target.value)} /><br />
//                 Upload Photo: <input type="file" onChange={handleImageChange} /><br />
//                 <Button variant="outlined" onClick={() => {
//                     EditOneQuiz({ quizId: quiz.id });
//                     navigate('/dashboard');
//                 }}>Edit done!</Button>
//             </b>
//         </>
//     )
// }

export default EditQuestion;
