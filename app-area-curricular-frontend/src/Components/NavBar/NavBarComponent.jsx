import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import QueueIcon from '@mui/icons-material/Queue';
import gasiSVG from '../../assets/gasi.svg';
import '../../sass/NavBar/NavBar.scss';
import AuthContext from '../Auth/AuthContext';

export default function NavBarComponent() {
  const { auth, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const sidebarItems = (
    <List>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link to="/acts" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Actas" />
        </ListItem>
      </Link>
      <Link to="/studentPage" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
        <ListItemIcon>
          <PeopleAltIcon/>
        </ListItemIcon>
          <ListItemText primary="Estudiantes" />
        </ListItem>
      </Link>
      <Link to="/categoryTable" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
        <ListItemIcon>
          <CategoryIcon/>
        </ListItemIcon>
          <ListItemText primary="Categoría solicitudes" />
        </ListItem>
      </Link>
      <Link to="/multiStudentsRequest" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
        <ListItemIcon>
          <QueueIcon/>
        </ListItemIcon>
          <ListItemText primary="Solicitud múltiple" />
        </ListItem>
      </Link>
      <Link to="/participants" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
        <ListItemIcon>
          <BadgeIcon/>
        </ListItemIcon>
          <ListItemText primary="Participantes del comité" />
        </ListItem>
      </Link>
      {auth?.role === 'ADMIN' && (
      <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button onClick={handleClose}>
        <ListItemIcon>
          <GroupAddIcon/>
        </ListItemIcon>
          <ListItemText primary="Usuarios del sistema" />
        </ListItem>
      </Link>
      )}
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#0033A0' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={gasiSVG} style={{ height: '2em', width: 'auto', marginRight: '0.5em' }} alt="Logo" />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        open={openSidebar}
        onClose={toggleSidebar}
        sx={{
          width: '250px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '250px',
          },
        }}
      >
        {sidebarItems}
      </Drawer>
    </Box>
  );
}
