import React from 'react';
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Tokenomics = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h1" className={classes.title}>
              Tokenomics
            </Typography>
            <br />
            <div className={classes.text}>
              We will have a limited supply of Whisker (WSK) NEP-141 tokens which any invitee will be asked to stake
              only then he will be eligible to receive an NFT from others.
            </div>

            <div className={classes.text}>
              Earning rewards while being a member of the ecosystem.
            </div>

            {/* <div className={classes.btnCont}>
              <button className={classes.btn} onClick={() => window.open("", "_blank")}>
                <img src="logo.svg" alt="logo" className={classes.logo} />
                Invite
              </button>
            </div> */}
          </Grid>

          <Grid item xs={12} sm={7}>
            <div className={classes.graphicContainer}>
              <img src="images/nft.svg" alt="graphic" className={classes.graphic} />
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
    backgroundColor: "rgb(255,254,246,0.8)",
    "@media (max-width:959px)": {
      padding: "0 10px",
      paddingBottom: "20px",
    },
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: "20px 0",
    fontSize: 26,
    color: "#48360C",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    color: "#48360c",
    marginBottom: 20,
  },
  logo: {
    height: 30,
    marginRight: 10,
  },
  graphicContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  graphic: {
    width: "94%",
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
}));


export default Tokenomics;
