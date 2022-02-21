import React, { useState, useContext } from "react";
import Blockies from "react-blockies";
import { makeStyles } from "@material-ui/core/styles";

// import { login, logout } from '@utils/near';
import { nearContext } from "@contexts/nearContext";

// const truncateAddress = (address) => {
//   return address.slice(0, 6) + "..." + address.slice(-4);
// };

const ConnectWallet = () => {
  const classes = useStyles();
  const { address, login, logout } = useContext(nearContext);

  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutButton = () => {
    showLogout ? setShowLogout(false) : setShowLogout(true);
  };

  const disconnectWallet = () => {
    logout();
    setShowLogout(false);
  };

  return (
    <div className={classes.walletBtnContainer}>
      <button
        className={classes.walletBtn}
        onClick={address ? toggleLogoutButton : login}
      >
        <Blockies
          className={`${classes.img} ${address ? "green" : "red"}`}
          seed={address ? address : ""}
        />
        <div>{address ? address : "Connect Wallet"}</div>
      </button>
      {showLogout && (
        <div onClick={disconnectWallet} className={classes.logout}>
          Logout
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  walletBtnContainer: {
    display: "flex",
    position: "relative",
    marginLeft: 20,
    alignItems: "center",
  },
  walletBtn: {
    background: "#234C4D",
    cursor: "pointer",
    border: 0,
    outline: "none",
    boxShadow: "5px 5px 0px #6599dc",
    height: 40,
    lineHeight: "36px",
    padding: "18px 8px",
    display: "flex",
    alignItems: "center",
    color: "white",

    "@media (max-width:599px)": {
      padding: 0,
    },

    "&:hover": {
      backgroundColor: "#000",
    },

    "& div": {
      "@media (max-width:599px)": {
        margin: 0,
        display: "none",
      },
    },
  },
  img: {
    marginRight: 10,
    height: "16px !important",
    width: "16px !important",

    "&.green": {
      borderColor: "green",
    },

    "&.red": {
      borderColor: "red",
    },

    "@media (max-width:599px)": {
      marginRight: 0,
      height: "36px !important",
      width: "36px !important",
      borderRadius: "20px",
      border: "2px solid",
    },
  },
  logout: {
    position: "absolute",
    backgroundColor: "#e3e3e3",
    color: "black",
    width: "100%",
    height: "36px",
    lineHeight: "36px",
    padding: "0 18px",
    borderRadius: "18px",
    top: "40px",
    right: "0",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "600",

    "&:hover": {
      color: "white",
      backgroundColor: "#000",
    },

    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
}));

export default ConnectWallet;
