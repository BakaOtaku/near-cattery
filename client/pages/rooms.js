import React, { useState, useContext } from "react";
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import Navbar from "@components/Navbar"
import Footer from "@components/Footer";
import { userContext } from "@contexts/userContext";
import { nearContext } from "@contexts/nearContext";

const Rooms = () => {
  const classes = useStyles();
  const { address } = useContext(nearContext);
  const router = useRouter();
  const { setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          state: {
            user: address,
            owner: address,
            isActive: true,
          }
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        cache: "no-cache",
      });
      const { room } = await res.json();

      setUser(room._id);
      router.push({
        pathname: `/rooms/${room._id}`,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>~/Cattery/rooms/</title>
      </Head>
      <div className={classes.bgCover}>
        <Navbar />
        <section className={classes.boxContainer}>
          <h1 className={classes.title}>Join Room</h1>
          <hr className={classes.break} />
          <div className={classes.descText}>
            Create and join active rooms.
          </div>

          <div className={classes.roomList}>
            <div className={classes.room}>
              <h1 className={classes.roomTitleMain}>+</h1>
              <div className={classes.descText}>
                Create a new room to start a jam session.
              </div>
              <Button className={classes.btn} onClick={createRoom} >🌱 Create Room</Button>
            </div>
            <div className={classes.room}>
              <h1 className={classes.roomTitle}>Hackathon discussion</h1>
              <div className={classes.descText}>
                This is a room for discussing the latest news and updates from the Hackathon discussion.
              </div>
              <Link href="rooms/60ec9b49bd70336e3cabb22a">
                <Button className={classes.btn} >🌱 Join Room</Button>
              </Link>
            </div>
            <div className={classes.room}>
              <h1 className={classes.roomTitle}>Fun Channel</h1>
              <div className={classes.descText}>
                This is a room for discussing the latest news and updates from the Fun Channel.
              </div>
              <Button className={classes.btn} >🌱 Join Room</Button>
            </div>
            <div className={classes.room}>
              <h1 className={classes.roomTitle}>Games</h1>
              <div className={classes.descText}>
                This is a room for discussing the latest news and updates from the Games
              </div>
              <Button className={classes.btn} >🌱 Join Room</Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
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
  roomTitleMain: {
    fontSize: "80px",
    color: "#234C4D",
    textAlign: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: 400,
    margin: 0,
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
  roomList: {
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    display: "grid",
    gridGap: "1.25rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginTop: "2rem",
    transition: "0.4s ease-in-out",
    marginTop: 20,
    ["@media (max-width:599px)"]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  room: {
    width: "100%",
    minHeight: "200px",
    borderRadius: 12,
    background: "linear-gradient(180deg,#efa971,#e4cafe)",
    padding: "1.25rem 1.25rem 60px",
    animation: "$bottom_up 1s ease-in-out",

    "&:nth-child(1)": {
      background: "linear-gradient(180deg,#dbb4f3,#efb7d7)"
    },
    "&:nth-child(2)": {
      background: "linear-gradient(180deg,#efa971,#e4cafe)"
    },
    "&:nth-child(3)": {
      background: "linear-gradient(180deg,#b1e5f9,#f4d2fe)"
    },
    "&:nth-child(4)": {
      background: "linear-gradient(90deg,#b1e5f9,#f4d2fe)"
    },
    "&:nth-child(5)": {
      background: "linear-gradient(180deg,#f3cbab,#feedca)"
    },

    "&:hover": {
      transform: "scale(1.02)"
    }
  },
  "@keyframes bottom_up": {
    "0%": {
      opacity: 0,
      transform: "translateY(40px)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
  roomTitle: {
    color: "#234C4D",
    fontSize: 25,
    fontWeight: 300,
    letterSpacing: "-.5px",
    margin: 0,
    ["@media (max-width:599px)"]: {
      fontSize: 20,
    },
  }
}));

export default Rooms;
