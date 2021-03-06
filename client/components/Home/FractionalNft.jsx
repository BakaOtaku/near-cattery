import React from 'react';
import Link from 'next/link';
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const FractionalNft = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.title}>
          Fractional NFT?
        </Typography>
        <div className={classes.text}>
          Create a pool from the NFT you have received.
        </div>
        <div className={classes.text}>
          Fractionalize your NFT by creating a pool.
        </div>
        <div className={classes.text}>
          Distribute the pool tokens to your audience to let them join your room.
        </div>

        <div className={classes.graphicContainer}>
          <img src="images/nft_list.svg" alt="graphic" className={classes.graphic} />
        </div>

        <div className={classes.btnCont}>
          <Link href="/pool">
            <button className={classes.btn}>
              <img src="logo.svg" alt="logo" className={classes.logo} />
              Create Pool
            </button>
          </Link>
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
    overflow: "hidden",
    "@media (max-width:959px)": {
      padding: "40px 10px",
      paddingBottom: "120px",
    },
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "10px 0",
    backgroundColor: "rgb(255,206,50,0.7)",
    borderRadius: 25,
    textAlign: "center",
    position: "relative",
    "@media (max-width:959px)": {
      padding: "10px",
    },
  },
  title: {
    margin: "20px 0",
    fontSize: 32,
    color: "#48360C",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
    maxWidth: 950,
    margin: "20px auto",
    color: "#48360c",
  },
  graphicContainer: {
    width: "100%",
    margin: "50px 0 80px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  graphic: {
    width: "100%",
    margin: "0 auto",
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
    maxWidth: 350,
    width: "80%",
    height: 80,
    display: "flex",
    position: "absolute",
    bottom: "-56px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
  },
}));


export default FractionalNft;
