import React, { FC } from "react";
import {
  MoAItemListGraph,
  MoAItemListName,
  MoAItemListPaper,
  MoAItemText,
} from "../MoAItem/style";
import { Grid, Skeleton } from "@mui/material";
interface MoAListSkeletonProps {
  listType: MoAListType;
}
const MoAListSkeleton: FC<MoAListSkeletonProps> = ({ listType }) => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} md={listType === "card" ? 4 : 12} key={item}>
          <MoAItemListPaper>
            <MoAItemListName>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={183}
                height={33}
              />
            </MoAItemListName>
            <MoAItemListGraph>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={111}
                height={80}
                sx={{ mr: "20px" }}
              />
              <MoAItemText sx={{ width: "350px" }}>
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
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                />
              </MoAItemText>
            </MoAItemListGraph>
          </MoAItemListPaper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoAListSkeleton;
