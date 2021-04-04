import { Box, IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selectors';

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
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemsCountSelector);

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
  
  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LocalMallIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to='/'>iShop</Link>
          </Typography>

          <NavLink className={classes.link} color="inherit" to="/todos"><Button color="inherit">Todos</Button></NavLink>
          <NavLink className={classes.link} color="inherit" to="/albums"><Button color="inherit">Albums</Button></NavLink>
          <NavLink className={classes.link} color="inherit" to="/products"><Button color="inherit">Products</Button></NavLink>

          {!isLoggedIn && (<Button color="inherit" onClick={handleClickOpen}>Login</Button>)}

          <IconButton aria-label="cart" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

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
