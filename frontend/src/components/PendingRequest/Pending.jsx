import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './Pending.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

export default function Pend(props) {
  const loc = useLocation();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '95%' ,bgcolor: 'background.paper',padding:'10px'}}>
      <Divider />
      <ListItemButton 
        className='pendingitem'
        sx={{display:'grid'}} 
        component="button"
        onClick={() => {
          navigate(`/details/${props.id}`, {state: {pg: loc.pathname}});
        }} 
      >
        <ListItemText className='pendingitemlt' primary={props.LtNumber} />
        <ListItemText className='pendingitemtext' primary={props.date}/>
      </ListItemButton>
      <Divider />
    </Box>
  );
}

Pend.propTypes={
  LtNumber:PropTypes.string.isRequired,
  date:PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};