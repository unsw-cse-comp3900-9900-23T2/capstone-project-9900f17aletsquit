import React from 'react';
import Button from './Buttons';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function EditGame () {
  const [showEditgame, setShowEditgame] = React.useState(false);
  const [showCurrEditgame, setShowCurrEditgame] = React.useState(null);
  const [thumbNail, setthumbNail] = React.useState('');
}