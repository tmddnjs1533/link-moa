import React, { FC } from "react";
import { Container } from "@mui/material";

const Footer: FC = () => {
  return (
    <Container maxWidth="lg">
      Copyright {new Date().getFullYear()}. tmddnjs1533. All rights reserved.
    </Container>
  );
};
export default Footer;
