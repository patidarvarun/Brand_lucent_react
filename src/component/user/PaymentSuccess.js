import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./user.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid rgb(104, 143, 78) !important",
  boxShadow: 24,
  p: 4,
};
const PaymentSuccess = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="checkCircle">
            <CheckCircleIcon className="circlePayment" />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h2 className="paymentHeadingg">Thank You!</h2>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="paymentPera"> Your Payment is Successfully Done.</p>
          </Typography>
          <br />
          <div className="shoppingPayment">
            <Link to="/">
              <button type="" className="btn btn-primary shoppingbutton">
                Continue shopping
              </button>
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentSuccess;
