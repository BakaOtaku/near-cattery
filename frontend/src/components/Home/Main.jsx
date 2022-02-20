import React from "react";

import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Details = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container} style={{ padding: "50px 20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} style={{ padding: '50px 5px' }}>
            <Typography variant="h1" className={classes.title}>
              Cattery
            </Typography>
            <Typography variant="h1" className={classes.subtitle}>
              Decentralised voice metaverse
            </Typography>
            <br />
            <div style={{ display: 'flex', alignContent: 'center', marginBottom: 10 }}>
              <img src="img/tick.svg" alt="tick" style={{ marginRight: 10 }} />
              <Typography variant="subtitle1" className={classes.text}>
                Dynamic NFT based membership dapp.
              </Typography>
            </div>
            <div style={{ display: 'flex', alignContent: 'center', marginBottom: 10 }}>
              <img src="img/tick.svg" alt="tick" style={{ marginRight: 10 }} />
              <Typography variant="subtitle1" className={classes.text}>
                Even users can join even with anonymity.
              </Typography>
            </div>
            <div style={{ display: 'flex', alignContent: 'center', marginBottom: 10 }}>
              <img src="img/tick.svg" alt="tick" style={{ marginRight: 10 }} />
              <Typography variant="subtitle1" className={classes.text}>
                Earn rewards just by being part of the community.
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={classes.btnCont}>
                <button className={classes.btn} onClick={() => window.open("", "_blank")}>
                  <img src="logo.svg" alt="logo" className={classes.logo} />
                  Register
                </button>
              </div>
              <div className={classes.btnCont}>
                <button className={classes.btn} onClick={() => window.open("", "_blank")}>
                  <img src="logo.svg" alt="logo" className={classes.logo} />
                  All Rooms
                </button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.graphicContainer}>
              <img src="images/beluga.gif" alt="graphic" className={classes.graphic} />
              <Typography variant="h1" className={classes.graphText}>
                Already have NFT ? Join the community! Ask friends for referal NFT
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  details: {
    padding: 0,
    position: "relative",
    overflow: "hidden",

    "@media (max-width:959px)": {
      paddingBottom: "20px",
    },
  },
  title: {
    marginBottom: 20,
    fontSize: 70,
    fontWeight: "700",
    background: "linear-gradient(90deg, #234C4D -2.21%, #24A19C 92.02%)",
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',

    "@media (max-width:959px)": {
      fontSize: 50,
    },
  },
  subtitle: {
    margin: "20px 0",
    fontSize: 24,
    color: "#234C4D",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#234C4D",
  },
  graphicContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  graphText: {
    width: "90%",
    margin: "20px 0",
    fontSize: 18,
    color: "#234C4D",
  },
  graphic: {
    maxWidth: 280,
    width: "94%",
  },
}));

export default Details;
