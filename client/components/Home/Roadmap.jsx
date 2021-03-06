import React from 'react';
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Roadmap = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.title}>
          Roadmap
        </Typography>

        <div className={classes.roadmap}>
          <img src="images/tree.svg" alt="Roadmap" className={classes.treeLogo} />
          <div className={classes.text}>
            (Q1 2022)
          </div>
          <div className={classes.oneBlock}>
            <div className={classes.subText}>
              Launch Product with tokens and referal nft logic.
            </div>
            <div className={classes.subText}>
              Users can create rooms or join rooms with good bandwidth.
            </div>
          </div>

          <div className={classes.text}>
            (Q3 2022)
          </div>
          <div className={classes.oneBlock}>
            <div className={classes.subText}>
              Implement libp2p for core voice chat functionality.
            </div>
            <div className={classes.subText}>
              A marketplace for buying and selling invites NFT for the platform.
            </div>
          </div>

          <div className={classes.text}>
            FUTURE...
          </div>
          <div className={classes.oneBlock}>
            <div className={classes.subText}>
              Exclusive membership feature released.
            </div>
            <div className={classes.subText}>
              Users with more $WSK locked in the contract would unlock more privileges.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  details: {
    padding: "60px 10px 30px 10px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgb(255,254,246,0.8)",
    "@media (max-width:959px)": {
      padding: "0 10px",
      paddingBottom: "120px",
    },
  },
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "10px 0",
    borderRadius: 25,
    textAlign: "center",
    position: "relative",
    "@media (max-width:959px)": {
      padding: "10px",
    },
  },
  title: {
    marginBottom: 80,
    fontSize: 30,
    color: "#48360C",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "left",
    margin: "25px auto 10px auto",
    color: "#48360c",
  },
  roadmap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    position: "relative",
  },
  treeLogo: {
    position: "absolute",
    left: "-8%",
    top: "-10%",
    "@media (max-width:659px)": {
      left: "-22%",
      top: "-12%",
    },
  },
  oneBlock: {
    width: "100%",
    height: 220,
    padding: "30px 0 0 30%",
    backgroundColor: "#FFCE32",
    borderRadius: 30,
    boxShadow: "8px 8px 0px #DAA719",
    "@media (max-width:659px)": {
      padding: "20px 0 0 25%",
    },
  },
  subText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
    margin: "25px auto 10px auto",
    color: "#48360c",
  }
}));

export default Roadmap;
