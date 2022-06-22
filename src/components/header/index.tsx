import React, { FC, useCallback, useContext } from "react";
import {
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ButtonBox, HeaderContainer } from "./style";
import { ColorModeContext } from "styles/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
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
          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Button
            endIcon={<AddIcon />}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography variant="button">링크추가</Typography>
          </Button>
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <AddIcon />
          </IconButton>
        </ButtonBox>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
