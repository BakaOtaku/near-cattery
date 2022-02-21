import React, { useState, useContext } from "react";
import Head from 'next/head';
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";

import ResultModal from '@components/Modal';
import Navbar from "@components/Navbar"
import Footer from "@components/Footer";

const Pools = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [triggerModal, setTriggerModal] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const createPool = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      let tx = await nft_contract.create_pool(
        { 'pool_id': 'nftpoolcontract.somenewname.testnet', 'roomsize': '100000' },
        "300000000000000"
      );
      console.log(tx);
      setResult('');
      setTriggerModal(true)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      console.error(e);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>~/Cattery/pool</title>
      </Head>
      <div className={classes.bgCover}>
        <Navbar />

        <section className={classes.boxContainer}>
          <ResultModal
            triggerModal={triggerModal}
            setTriggerModal={setTriggerModal}
            message="Pool created successfully"
            hash={result}
          />
          <h1 className={classes.title}>Create Pool</h1>
          <hr className={classes.break} />
          <div className={classes.descText}>
            Generate a pool from your Nft. Users can come and use this fraction of Nft to join your pool activities.
          </div>

          <Button
            type="submit"
            disabled={isLoading ? true : false}
            onClick={createPool}
            className={`${classes.btn} ${classes.filled} ${isLoading && classes.btnWithLoader}`}
          >
            {isLoading ? "Verifying..." : "⛩ Create Pool"}
            {isLoading && (
              <CircularProgress
                className={`${classes.loading}`}
                size={24}
              />
            )}
          </Button>
          <p>
            {error && error}
          </p>
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  ...theme.overrides.formStyle,
  bgCover: {
    backgroundColor: "#AEE0E1",
  },
  boxContainer: {
    maxWidth: 1000,
    minHeight: '80vh',
    padding: "20px 10px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    "@media (max-width:959px)": {
      padding: "0 10px",
      paddingBottom: "120px",
    },
  },
  container: {
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
    margin: "0",
    fontSize: 35,
    fontWeight: 400,
    color: "#234C4D",
    ["@media (max-width:599px)"]: {
      fontSize: 25,
    },
  },
  descText: {
    fontSize: 17,
    color: "#234C4D",
    fontWeight: 400,
    padding: "20px 20px 0 0",
    marginBottom: "20px",
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
    maxWidth: 220,
    width: "94%",
  },
}));

export default Pools;
