import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import Main from "../components/Rooms/Main";
import Footer from "../components/Footer";

const Rooms = () => {
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

export default Rooms;
