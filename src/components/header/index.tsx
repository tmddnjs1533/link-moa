import React, { FC, useCallback, useContext } from "react";
import { Container, IconButton, Typography, useTheme } from "@mui/material";
import { ButtonBox, HeaderContainer } from "./style";
import { ColorModeContext } from "styles/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddMoA from "../addMoA";
const Header: FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const toggleMode = useCallback(() => {
    colorMode.toggleColorMode();
  }, [colorMode]);
  return (
    <Container maxWidth="lg">
      <HeaderContainer>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 20, md: 32 },
          }}
        >
          링크모아
        </Typography>
        <ButtonBox>
          {/*dark mode button*/}
          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          {/*add button*/}
          <AddMoA />
        </ButtonBox>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
