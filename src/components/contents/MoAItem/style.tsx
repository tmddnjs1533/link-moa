import { styled, Paper, Box, Typography } from "@mui/material";

export const MoAItemCardPaper = styled(Paper)`
  width: 100%;
  height: 214px;
  padding: 29px 31px;
`;

export const MoAItemCardTop = styled(Box)`
  display: grid;
  grid-template-columns: calc((100% - 20px) * 0.382) calc((100% - 20px) * 0.618) 16px;
  align-items: start;
  height: 102px;
  margin-bottom: 17px;
  position: relative;
`;

export const MoAItemListPaper = styled(Paper)`
  padding: 29px 34px;
  display: grid;
  grid-template-columns: calc((100% - 56px) * 0.382) calc((100% - 56px) * 0.618) 20px;
`;

export const MoAItemListName = styled(Box)`
  display: flex;
  align-items: center;
`;

export const MoAItemListNameTypography = styled(Typography)`
  font-family: "S-CoreDream-4Regular", sans-serif;
  font-size: 24px;
`;

export const MoAItemListGraph = styled(Box)`
  display: flex;
  max-width: 500px;
  height: 80px;
`;
export const MoAItemListButton = styled(Box)`
  display: flex;
  align-items: center;
`;

export const MoAItemImg = styled(Box)`
  height: 100%;
  flex-shrink: 0;
  margin-right: 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${({ listType }: { listType?: boolean }) => listType && `width: 111px;`}
`;
export const MoAItemText = styled(Box)`
  flex-grow: 0;
  max-width: 379px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const NameText = styled(Typography)`
  font-family: "S-CoreDream-4Regular", sans-serif;
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

export const ListTitleText = styled(Typography)`
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? `#ffffff` : `#6d6d6d`};
  font-weight: 500;
  font-size: 12px;
`;
export const ListURLText = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? `#B5B5B5` : `#919191`};
`;
export const ListDescriptionText = styled(Typography)`
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? `#ECECEC` : `#919191`};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
