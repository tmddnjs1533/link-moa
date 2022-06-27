import React, { FC, useState, useCallback } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddMoAForm from "./AddMoAForm";

const AddMoA: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      {/*md up button*/}
      <Button
        endIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="button">링크추가</Typography>
      </Button>
      {/*md down button*/}
      <IconButton
        onClick={handleOpen}
        sx={{
          width: "48px",
          height: "48px",
          display: { xs: "block", md: "none" },
        }}
      >
        <AddIcon fontSize="large" />
      </IconButton>

      <AddMoAForm open={open} setOpen={setOpen} />
    </>
  );
};

export default AddMoA;
