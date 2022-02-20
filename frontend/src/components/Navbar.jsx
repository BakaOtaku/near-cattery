import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Container } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import ConnectWallet from "./Connect";

const Navbar = () => {
  const classes = useStyles();

  // to toggle the menu
  const [openMenu, setOpenMenu] = useState(false);
  const menuItemContainerRef = useRef(null);
  const toggleMenu = (state) => {
    state
      ? menuItemContainerRef.current.classList.add("open")
      : menuItemContainerRef.current.classList.remove("open");
    setOpenMenu(state);
  };

  return (
    <AppBar position="static" classes={{ root: classes.nav }}>
      <Container className={classes.container}>
        <div className={classes.flexContainer}>

          <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="images/cattery-nav.svg" alt="logo" className={classes.logo} />
          </NavLink>

          <div className={classes.rightSec}>
            <div className={classes.menuItemContainer} ref={menuItemContainerRef}>
              <NavLink exact to="/rooms" className="menuItem active">All Rooms</NavLink>
              <NavLink exact to="/invite" className="menuItem active">Invite</NavLink>
            </div>

            <ConnectWallet />

            <MenuIcon
              className={classes.menuIcon}
              onClick={() => {
                openMenu ? toggleMenu(false) : toggleMenu(true);
              }}
            />
          </div>

        </div>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  nav: {
    height: "70px",
    boxShadow: "none",
    background: 'inherit',
    marginBottom: "40px",
    position: "relative",
    backgroundColor: "rgb(255,254,246, 0.4)",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "60px",
  },
  rightSec: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    maxWidth: "500px",
    width: "100%",
    "@media (max-width:599px)": {
      maxWidth: 150,
      justifyContent: "flex-end",
    },
  },
  menuItemContainer: {
    display: "flex",
    "@media (max-width:599px)": {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      backgroundColor: "#FAC6A5",
      width: "100%",
      top: "70px",
      left: 0,
      padding: 0,
      height: 0,
      overflow: "hidden",
      transition: "all 0.5s ease",
    },
    "&.open": {
      padding: "20px 0",
      height: "auto",
      transition: "all 0.5s ease",
    },
    "& .menuItem": {
      marginRight: "30px",
      fontSize: "16px",
      textDecoration: "none",
      lineHeight: "36px",
      fontWeight: 400,
      "&.active": {
        color: "#234C4D",
      },
      "&:hover": {
        textDecoration: "underline",
      },
      "@media (max-width:599px)": {
        margin: 0,
        color: "#234C4D",
        textAlign: "center",
        lineHeight: "50px",
      },
    },
  },
  walletConnects: {
    maxWidth: "300px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  menuIcon: {
    display: "none",
    height: 38,
    width: 38,
    background: "#7d5c20",
    "@media (max-width:599px)": {
      marginLeft: "20px",
      display: "flex"
    },
  },
  smIcon: {
    width: 38,
    height: 38,
    borderRadius: "20px",
    backgroundColor: "#48360C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#234C4D",
    transition: "0.1s ease",
    "&:first-child": {
      marginRight: "10px",
    },
    "&:hover": {
      backgroundColor: "#ffdd30",
      "& svg": {
        fill: "black",
      },
    },
    "@media (max-width:599px)": {
      marginTop: "30px",
    },
  },
  smIconsContainer: {
    display: "flex",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "@media (max-width:599px)": {
      justifyContent: "flex-start",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
}));

export default Navbar;