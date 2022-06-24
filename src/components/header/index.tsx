import React, { FC } from "react";
import { Container, Typography } from "@mui/material";

import AddMoA from "../addMoA";
import { ButtonBox, HeaderContainer } from "./style";
import DarkModeButton from "./DarkModeButton";
import EditModeButton from "./EditModeButton";
const Header: FC = () => {
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
          <DarkModeButton />
          {/*add button*/}
          <AddMoA />
          <EditModeButton />
        </ButtonBox>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
