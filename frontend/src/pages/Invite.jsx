import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import Main from "../components/Invite/Main";
import Footer from "../components/Footer";

const Invite = () => {
  const classes = useStyles();

  return (
    <div className={classes.bgCover}>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  bgCover: {
    backgroundColor: "#AEE0E1",
  },
}));

export default Invite;
