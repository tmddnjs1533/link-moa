import {
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
export const ConfirmContainer = styled(Dialog)`
  & > .MuiBackdrop-root {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" && `rgba(255,255,255,0.36)`};
  }
  & .MuiDialog-paper {
    padding: 0 20px;
    width: 450px;
    max-width: 450px;
    box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.7);
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 0;
  }
`;

export const ConfirmTitle = styled(DialogTitle)`
  text-align: center;
`;

export const ConfirmActions = styled(DialogActions)`
  justify-content: center;
  padding-bottom: 20px;
`;

export const ConfirmAction = styled(Button)`
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 30px;
  padding: 3px 20px 4px;
`;
