import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "@components/Navbar";
import Main from "@components/Home/Main";
import WhyCattery from "@components/Home/WhyCattery";
import Tokenomics from "@components/Home/Tokenomics";
import FractionalNft from "@components/Home/FractionalNft";
import Team from "@components/Home/Team";
import Roadmap from "@components/Home/Roadmap";
import Footer from "@components/Footer";

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.bgCover}>
      <Navbar />
      <Main />
      <WhyCattery />
      <Tokenomics />
      <FractionalNft />
      <Team />
      <Roadmap />
      <Footer />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  bgCover: {
    backgroundColor: "#AEE0E1",
  },
}));

export default Index;
