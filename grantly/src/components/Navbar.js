import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import FGLogo from "../assets/FGLogo";
import Media from "react-media";
import { connect } from "react-redux";

// Material core imports
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ViewListIcon from "@material-ui/icons/ViewList";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MailIcon from "@material-ui/icons/Mail";
import InfoIcon from "@material-ui/icons/Info";
import { navStyles } from "../styles/navStyles";

export const NavBar = props => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    loading
  } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(!isOpen);
  };

  //   const [currentNavUser, setCurrentNavUser] = useState([]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       setCurrentNavUser(user);
//       console.log("navCurrent", currentNavUser);
//     }
//   }, [user]);

  const classes = navStyles();

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      className={classes.drawer}
    >
      <List className={classes.links}>
        <ListItem className={classes.drawerStlye}>
          <ListItemAvatar>
            <ListItemIcon className={classes.icon}>
              <DashboardIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <Link to="/grants" className={classes.drawerLink}>
            <Typography variant="h5">View All Grants</Typography>
          </Link>
        </ListItem>
        
        {isAuthenticated ? (
          <ListItem className={classes.drawerStlye}>
            <ListItemAvatar>
              <ListItemIcon className={classes.icon}>
                <MailIcon />
              </ListItemIcon>
            </ListItemAvatar>
            <Link to="/form" className={classes.drawerLink}>
              <Typography variant="h5">Suggest a Grant</Typography>
            </Link>
          </ListItem>
        ) : null}

        <ListItem className={classes.drawerStlye}>
          <ListItemAvatar>
            <ListItemIcon className={classes.icon}>
              <InfoIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <Link to="/about" className={classes.drawerLink}>
            <Typography variant="h5">About Founder Grants</Typography>
          </Link>
        </ListItem>

        {/* {props.role === "admin" ? (<ListItem
          className={classes.drawerStlye}
        >
          <ListItemAvatar>
            <ListItemIcon
              className={classes.icon}
            >
              <DashboardIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <Link to="/admin" className={classes.drawerLink}>
            <Typography variant="h5">Edit Grants Old</Typography>
          </Link>
        </ListItem>): null} */}

        {isAuthenticated ? (
          user["https://founder-grants.com/appdata"].authorization.roles.find(
            () => "Moderator"
          ) === "Moderator" ? (
            <ListItem className={classes.drawerStlye}>
              <ListItemAvatar>
                <ListItemIcon className={classes.icon}>
                  <ViewListIcon />
                </ListItemIcon>
              </ListItemAvatar>
              <Link to="/table" className={classes.drawerLink}>
                <Typography variant="h5">Edit Grants Table</Typography>
              </Link>
            </ListItem>
          ) : null
        ) : null}

        {/* {props.role === "admin" ? (
          <ListItem className={classes.drawerStlye}>
            <ListItemAvatar>
              <ListItemIcon className={classes.icon}>
                <SupervisorAccountIcon />
              </ListItemIcon>
            </ListItemAvatar>
            <Link to="/grants" className={classes.drawerLink}>
              <Typography variant="h5">Promote Users</Typography>
            </Link>
          </ListItem>
        ) : null} */}

        {isAuthenticated ? (
          <ListItem>
            <Button
              className={classes.navButton}
              color="inherit"
              variant="outlined"
              onClick={() => logout()}
            >
              Log out
            </Button>
          </ListItem>
        ) : (
          <ListItem>
            <Button
              className={classes.navButton}
              color="inherit"
              variant="outlined"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );

  //delays for token
  if (loading) {
    return <h1 className={classes.navLoading}>App Loading...</h1>;
  } else {
    return (
      <AppBar
        className={classes.navbar}
        data-testid="main-nav"
        color="primary"
        position="sticky"
      >
        <Toolbar className={classes.toolBar}>
          <Link to="/" className={classes.titleLink}>
            <Typography variant="h4" className={classes.title}>
              <FGLogo />
            </Typography>
          </Link>
          {/* If there is a token, hamburger appears at right */}
          {isAuthenticated && (
            <>
              <h1 className={classes.helloUser}>Welcome, {user.nickname}</h1>
              <IconButton
                // className={classes.menu}
                edge="start"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer()}
              >
                <MenuIcon className={classes.menu} />
              </IconButton>
            </>
          )}
          {/* If there is not a token, login button appears */}
          {/* media query for mobile view shows a menu icon */}
          <div>
            {!isAuthenticated && (
              <Media query="(max-width:900px)">
                {matches =>
                  matches ? (
                    <>
                      <IconButton
                        // className={classes.menu}
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        onClick={toggleDrawer()}
                      >
                        <MenuIcon className={classes.menu} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/grants"
                        className={classes.navLink}
                        activeClassName={classes.active}
                        onClick={() => props.fetchApi()}
                      >
                        Grants
                      </Link>
                      <Link
                        to="/about"
                        className={classes.navLink}
                        activeClassName={classes.active}
                      >
                        About
                      </Link>
                      <Link
                        className={classes.navButton}
                        // color="inherit"
                        // variant="outlined"
                        onClick={() => loginWithRedirect()}
                      >
                        Log in
                      </Link>
                    </>
                  )
                }
              </Media>
            )}
          </div>
          <SwipeableDrawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {sideList("right")}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
};


export default NavBar;
