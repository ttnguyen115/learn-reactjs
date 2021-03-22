import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  }

}));

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MovieFilterIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to='/'>iFlix</Link>
          </Typography>

          {/* <NavLink color="inherit" to="/"><Button color="inherit">Home</Button></NavLink> */}
          <NavLink className={classes.link} color="inherit" to="/todos"><Button color="inherit">Todos</Button></NavLink>
          <NavLink className={classes.link} color="inherit" to="/albums"><Button color="inherit">Albums</Button></NavLink>
          <Button color="inherit" onClick={handleClickOpen}>Register</Button>
          
        </Toolbar>
      </AppBar>

      <Dialog 
        disableBackdropClick 
        disableEscapeKeyDown 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >

        <IconButton className={classes.closeBtn} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          <Register closeDialog={handleClose} />
        </DialogContent>
      </Dialog>

    </div>
  );
}
