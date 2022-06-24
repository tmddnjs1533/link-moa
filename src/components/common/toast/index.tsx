import React, { FC, useCallback } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { toastState } from "redux/store";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setToastHide } from "redux/toastSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast: FC = () => {
  const toast = useAppSelector(toastState);
  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => {
    dispatch(setToastHide());
  }, [dispatch]);

  return (
    <Snackbar
      open={toast.show}
      onClose={handleClose}
      key={toast.status}
      autoHideDuration={6000}
    >
      <Alert
        onClose={handleClose}
        severity={toast.status}
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
// {/*<Alert severity="error">This is an error message!</Alert>*/}
//   {/*<Alert severity="warning">This is a warning message!</Alert>*/}
//   {/*<Alert severity="info">This is an information message!</Alert>*/}
//   {/*<Alert severity="success">This is a success message!</Alert>*/}
