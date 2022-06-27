import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useAppSelector } from "hooks/useRedux";
import { dialogState } from "redux/store";
import useCustomDialog from "hooks/useCustomDialog";
import {
  ConfirmActions,
  ConfirmContainer,
  ConfirmTitle,
  ConfirmAction,
} from "./style";

export default function ConfirmDialog() {
  const { show, title, message } = useAppSelector(dialogState);
  const { onConfirm, onCancel } = useCustomDialog();

  return (
    <ConfirmContainer
      open={show}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <ConfirmTitle id="confirm-dialog-title">{title}</ConfirmTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <ConfirmActions>
        <ConfirmAction onClick={onCancel}>취소하기</ConfirmAction>
        <ConfirmAction onClick={onConfirm} autoFocus>
          확인하기
        </ConfirmAction>
      </ConfirmActions>
    </ConfirmContainer>
  );
}
