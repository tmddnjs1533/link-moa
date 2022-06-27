import React, { FC } from "react";
import { Grid, Skeleton } from "@mui/material";
import {
  MoAItemCardPaper,
  MoAItemCardTop,
  MoAItemText,
} from "../MoAItem/style";
interface MoACardSkeletonProps {
  listType: MoAListType;
}
const MoACardSkeleton: FC<MoACardSkeletonProps> = ({ listType }) => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} md={listType === "card" ? 4 : 12} key={item}>
          <MoAItemCardPaper>
            <MoAItemCardTop>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"100%"}
                sx={{ mr: "20px" }}
              />
              <MoAItemText>
                <Skeleton animation="wave" variant="rectangular" />
                <Skeleton animation="wave" variant="rectangular" />
                <Skeleton animation="wave" variant="rectangular" />
              </MoAItemText>
            </MoAItemCardTop>
            <Skeleton animation="wave" variant="rectangular" height={40} />
          </MoAItemCardPaper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoACardSkeleton;
