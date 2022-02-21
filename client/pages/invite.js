import React from "react";
import Head from 'next/head';
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "@components/Navbar";
import Main from "@components/Invite";
import Footer from "@components/Footer";

const Invite = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>~/Cattery/invite</title>
      </Head >
      <div className={classes.bgCover}>
        <Navbar />
        <Main />
        <Footer />
      </div >
    </React.Fragment>
  );
};

const useStyles = makeStyles(() => ({
  bgCover: {
    backgroundColor: "#AEE0E1",
  },
}));

export default Invite;
