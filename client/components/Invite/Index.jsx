import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ResultModal from '@components/Modal';
import { nearContext } from '@contexts/nearContext';

const Main = () => {
  const classes = useStyles();
  const { address } = useContext(nearContext);
  const [invites, setInvites] = useState(0);
  const [inviteeId, setInviteeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [triggerModal, setTriggerModal] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    setTriggerModal(true);
  };

  useEffect(() => {
    const find_invest = async () => {
      try {
        const inviteLeft = await window.nft_contract.invite_left({ 'account_id': address });
        console.log(`inviteLeft - `, inviteLeft);
        setInvites(inviteLeft);
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    }
    if (window.accountId) find_invest();
  }, [address]);

  const inviteUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      const tx = await nft_contract.invite_other({ 'invitee': inviteeId }, "300000000000000");
      console.log("tx await done", tx);
      // setResult(tx.hash);
      setTriggerModal(true)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      console.error(e);
    }
  }

  return (
    <section className={classes.details}>
      <ResultModal
        triggerModal={triggerModal}
        setTriggerModal={setTriggerModal}
        message="Invite sent successfully"
        hash={result}
      />
      <h1 className={classes.title}>Invite Someone</h1>
      <hr className={classes.break} />
      <div className={classes.descText}>
        Invite someone to join your cattery.
      </div>

      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <div className={classes.graphicContainer}>
              <img src="images/team3.svg" alt="graphic" className={classes.graphic} />
              <Typography variant="h1" className={classes.graphText}>
                {invites} / 2 invite Nft left
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={7}>
            <form onSubmit={inviteUser} className={classes.formContainer}>
              <div className={classes.inputContainer}>
                <label htmlFor="hash">Invitee near username</label>
                <input
                  type="text"
                  value={inviteeId}
                  placeholder={invites > 0 ? "Enter near username" : "No invite left"}
                  disabled={invites > 0 ? false : true}
                  onChange={(e) => setInviteeId(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={(isLoading || invites === 0) ? true : false}
                className={`${classes.btn} ${classes.filled} ${isLoading && classes.btnWithLoader}`}
              >
                {isLoading ? "Verifying..." : "Invite User"}
                {isLoading && (
                  <CircularProgress
                    className={`${classes.loading}`}
                    size={24}
                  />
                )}
              </Button>
              {error && error}
            </form>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  ...theme.overrides.formStyle,
  details: {
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


export default Main;
