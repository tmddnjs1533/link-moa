import React, { FC } from "react";
import { MoAMobileItemPaper, MoAMobileItemTop } from "../MoAMobileItem/style";
import { MoAItemText } from "../MoAItem/style";
import { Grid, Skeleton } from "@mui/material";

const MoAMobileSkeleton: FC = () => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} key={item}>
          <MoAMobileItemPaper>
            <MoAMobileItemTop sx={{ mb: "35px" }}>
              <MoAItemText sx={{ flexGrow: 2, mr: "20px" }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                />
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                />
              </MoAItemText>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"34%"}
                height={79}
              />
            </MoAMobileItemTop>
            <Skeleton animation="wave" variant="rectangular" height={40} />
          </MoAMobileItemPaper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoAMobileSkeleton;
