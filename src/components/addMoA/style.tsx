import {
  styled,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  FormControl,
  InputBase,
  FormLabel,
  TextareaAutosize,
  DialogActions,
} from "@mui/material";
import Typography from "@mui/material/Typography";
export const DialogContainer = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" && `rgba(255,255,255,0.56)`};
  }
  .MuiPaper-root {
    padding: 0 64px;
    width: 720px;
    height: 789px;
    max-width: 720px;
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.16);
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 0;
  }
`;

export const DialogHead = styled(DialogTitle)`
  height: 48px;
  width: 100%;
  margin-bottom: 16px;
`;

export const DialogCloseIconButton = styled(IconButton)`
  position: absolute;
  right: 24px;
  top: 24px;
  color: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
`;

export const DialogName = styled(Typography)`
  text-align: center;
  font-family: "S-CoreDream-6Bold", sans-serif;
  font-size: 24px;
  margin-bottom: 70px;
`;

export const InputContainer = styled(FormControl)`
  width: 100%;

  //flex-direction: row;
  //justify-content: space-between;
  //align-items: center;
  margin-bottom: 16px;
`;

export const InputBox = styled(Box)`
  width: 100%;
  height: 48px;
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  &.textarea {
    min-height: 170px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    label {
      margin: 12px 0;
    }
  }
`;

export const DialogLabel = styled(FormLabel)`
  font-family: "S-CoreDream-6Bold", sans-serif;
  font-size: 14px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  &.Mui-focused {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const DialogInput = styled(InputBase)`
  flex-grow: 1;
  .MuiInputBase-input {
    padding-left: 16px;
    text-align: right;
  }
`;

export const DialogTextArea = styled(TextareaAutosize)`
  flex-grow: 1;
  background-color: transparent;
  border: 0 none;
  height: 100%;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  margin-bottom: 12px;
`;

export const DialogThumbContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
`;
export const DialogThumb = styled(Box)`
  width: 175px;
  height: 120px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const DialogShadowIconButton = styled(IconButton)`
  margin-right: 8px;
  color: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
  ${({ theme }) =>
    theme.palette.mode !== "dark" &&
    `
     box-shadow: 4px 4px 0 rgba(0,0,0,0.16);
     `}
`;

export const DialogSubmitActions = styled(DialogActions)`
  padding: 44px 0;
`;

export const DialogSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
