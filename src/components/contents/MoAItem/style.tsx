import { styled, Paper, Box, Typography } from "@mui/material";

export const MoAItemPaper = styled(Paper)`
  width: 370px;
  height: 214px;
  padding: 29px 31px;
`;

export const MoAItemTop = styled(Box)`
  display: grid;
  grid-template-columns: 112px 153px 16px;
  grid-column-gap: 20px;
  margin-bottom: 17px;
`;
export const MoAItemImg = styled(Box)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const MoAItemText = styled(Box)`
  height: 102px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const NameText = styled(Typography)`
  font-family: "S-CoreDream-8Heavy", sans-serif;
  font-size: 20px;
`;
export const URLText = styled(Typography)`
  font-size: 12px;
  color: #919191;
`;
export const TitleText = styled(Typography)`
  color: #6d6d6d;
  font-weight: 500;
`;
export const DescriptionText = styled(Typography)`
  color: #919191;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
