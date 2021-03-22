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
import { IconButton, Box, Menu, MenuItem } from '@material-ui/core';
import { Close, AccountCircle } from '@material-ui/icons'; 
import Login from '../../features/Auth/components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/Auth/userSlice';

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

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register' 
}

export default function Header() {
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
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

          {!isLoggedIn && (<Button color="inherit" onClick={handleClickOpen}>Login</Button>)}
          {isLoggedIn && (<IconButton color="inherit" onClick={handleUserClick}><AccountCircle  /></IconButton>)}
          
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}

        // CSS menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

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
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              
              <Box textAlign="center">
                <Button 
                  color="primary"
                  onClick={() => {setMode(MODE.LOGIN)}}
                >
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}
          
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              
              <Box textAlign="center">
                <Button 
                  color="primary"
                  onClick={() => {setMode(MODE.REGISTER )}}
                >
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )} 
        </DialogContent>
      </Dialog>

    </div>
  );
}
