import React, { FC, useCallback, useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "styles/theme";
import { IconButton, useTheme } from "@mui/material";

const DarkModeButton: FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const toggleMode = useCallback(() => {
    colorMode.toggleColorMode();
  }, [colorMode]);
  return (
    <>
      {/*dark mode button*/}
      <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </>
  );
};

export default DarkModeButton;
