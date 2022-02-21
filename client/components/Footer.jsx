import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.cont}>
        <Typography variant="subtitle1" className={classes.text}>
          © BakaOtaku. All rights reserved.
        </Typography>

        <a href="https://explorer.testnet.near.org/accounts/nftcontract.somenewname.testnet"
          target="blank" rel="noreferrer"
        >
          <Typography variant="subtitle1" className={classes.text}>
            Our Smart contract
          </Typography>
        </a>
      </div>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  footer: {
    borderTop: "12px solid #FFCE32",
    position: "relative",
  },
  cont: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: "20px 0 40px 0",
    textAlign: 'center',
    maxWidth: 1080,
    margin: '0px auto'
  },
  text: {
    fontSize: "14px",
    color: "#234C4D",
    fontWeight: "400",
  },
}));

export default Footer;