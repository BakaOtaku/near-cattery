import React from 'react';
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const WhyCattery = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <Typography variant="h1" className={classes.title}>
              Why Cattery
            </Typography>
            <br />
            <div className={classes.text}>
              Clubhouse is an invitation-only social media app for iOS and Android where users can communicate in voice chat rooms that accommodate groups of thousands of people.
            </div>
            <div className={classes.text}>
              The audio-only app hosts live discussions, with opportunities to
              participate through speaking and listening. We find this use case suitable for an NFT based model.
              Only each NFT holder will have a permission to join clubhouse. Each user has one NFT and he can mint 2
              NFTs for other people which he wants to invite to the platform.
            </div>
          </Grid>

          <Grid item xs={12} sm={5}>
            <div className={classes.graphicContainer}>
              <img src="logo.svg" alt="graphic" className={classes.graphic} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  details: {
    padding: "60px 10px",
    position: "relative",
    overflow: "hidden",
    "@media (max-width:959px)": {
      padding: "0 10px",
      paddingBottom: "120px",
    },
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 40,
    backgroundColor: "#FAC6A5",
    borderRadius: 25,
    border: "1.5px solid #6599dc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: "20px 0",
    fontSize: 24,
    color: "#234C4D",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#234C4D",
    marginBottom: 20,
  },
  graphicContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  graphic: {
    maxWidth: 300,
    width: "94%",
  },
}));


export default WhyCattery;
