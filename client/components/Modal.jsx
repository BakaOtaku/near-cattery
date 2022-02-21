import React from "react";
import { Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const ResultModal = ({ triggerModal, setTriggerModal, hash, message }) => {
  const classes = useStyles();

  const closeModal = () => {
    setTriggerModal(false);
  };

  return (
    <Modal
      open={triggerModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modalContainer}
    >
      <div className={classes.modal}>
        <div className={classes.closeModal} onClick={closeModal}>
          <Close style={{ fontSize: "16px" }} />
        </div>
        <div className={classes.graphicSection}>
          <div className="iconContainer">
            <img src="/images/check.svg" alt="icon" />
          </div>
        </div>
        <div className={classes.textSection}>
          {message && <p><span>{message}</span></p>}
          {hash && <p>
            <span>
              Transaction → :{" "}
              <a href={`https://explorer.testnet.near.org/transactions/${hash}`}
                target="_blank"
                rel="noopener noreferrer">
                {hash}
              </a>
            </span>
          </p>}
        </div>
      </div>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.modalStyle,
  purple: {
    color: "#7533E2",
  },
}));

export default ResultModal;
