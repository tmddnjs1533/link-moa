import React, { useCallback, useContext } from "react";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { EditModeContext } from "contexts/MobilEditMode";
import EditIcon from "@mui/icons-material/Edit";
const EditModeButton = (): JSX.Element | null => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, editMode] = useContext(EditModeContext);
  const mobileMatches = useMediaQuery(theme.breakpoints.down("md"));

  const toggleEditMode = useCallback(() => {
    console.log(editMode);
    editMode.toggleEditMode();
  }, [editMode]);
  return mobileMatches ? (
    <IconButton onClick={toggleEditMode} color="inherit">
      <EditIcon fontSize="small" />
    </IconButton>
  ) : null;
};

export default EditModeButton;
