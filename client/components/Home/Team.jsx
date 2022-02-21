import React from 'react';
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";

const Team = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" className={classes.title}>
              Team
            </Typography>
            <div className={classes.text}>
              We are a team of 3 engineers, who has experience in designing and developing decentralised applications.
            </div>
            <div className={classes.text}>
              We've worked on a variety of projects together as a team.
            </div>

          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.graphicContainer}>
              <div className={classes.team}>
                <img src="logo.svg" alt="graphic" className={classes.teamImg} />
                <div className={classes.name}>Arpit Srivastava</div>
                <div className={classes.subname}>SDE @CertiK</div>
              </div>
              <div className={classes.team}>
                <img src="images/team2.svg" alt="graphic" className={classes.teamImg} />
                <div className={classes.name}>Aniket Dixit</div>
                <div className={classes.subname}>SDE @Tendermint</div>
              </div>
              <div className={classes.team}>
                <img src="images/team3.svg" alt="graphic" className={classes.teamImg} />
                <div className={classes.name}>Aman Raj</div>
                <div className={classes.subname}>SDE @CertiK</div>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className={classes.btnCont}>
          <button className={classes.btn} onClick={() => window.open("https://github.com/BakaOtaku", "_blank")}>
            <GitHub className={classes.logo} />
            BakaOtaku
          </button>
        </div>
      </Container>
    </section>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  details: {
    padding: "60px 10px",
    position: "relative",
    "@media (max-width:959px)": {
      padding: "0 10px",
      paddingBottom: "60px",
    },
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 25,
    border: "1.5px solid #6599dc",
    "@media (max-width:959px)": {
      paddingBottom: 100,
    },
  },
  title: {
    margin: "20px 0",
    fontSize: 28,
    color: "#48360C",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#48360c",
    marginBottom: 20,
  },
  graphicContainer: {
    minHeight: 320,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,

    "@media (max-width:959px)": {
      flexDirection: "column",
    },
  },
  team: {
    textAlign: "center",
  },
  teamImg: {
    width: 120,
  },
  name: {
    fontSize: 14,
  },
  subname: {
    marginTop: 10,
    fontSize: 12,
  },
  graphic: {
    width: 130,
    "@media (max-width:959px)": {
      float: "none",
    },
    "@media (max-width:599px)": {
      display: "block",
      margin: "auto",
    },
    "@media (max-width:340px)": {
      display: "block",
      margin: "auto",
    },
  },
  btnCont: {
    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 80%)",
    backgroundColor: "#A6C4EB",
    borderRadius: 24,
    maxWidth: 450,
    width: "80%",
    height: 100,
    display: "flex",
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
  },
}));


export default Team;
