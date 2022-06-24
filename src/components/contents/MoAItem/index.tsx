import React, { FC, useCallback } from "react";
import {
  DescriptionText,
  MoAItemImg,
  MoAItemCardPaper,
  MoAItemText,
  MoAItemCardTop,
  NameText,
  TitleText,
  URLText,
  MoAItemListPaper,
  MoAItemListName,
  MoAItemListGraph,
  MoAItemListButton,
  MoAItemListNameTypography,
  ListTitleText,
  ListDescriptionText,
  ListURLText,
} from "./style";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinkIcon from "@mui/icons-material/Link";
const MoAItem: FC<MoAItemProps> = ({ moa, listType }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      {listType === "card" ? (
        <MoAItemCardPaper>
          {/*  body*/}
          <MoAItemCardTop>
            <MoAItemImg>
              <img
                src={moa.thumb ?? "https://via.placeholder.com/112x102"}
                alt={moa.title ?? moa.name ?? "섬네일 없음"}
              />
            </MoAItemImg>

            <MoAItemText>
              <NameText noWrap>{moa.name}</NameText>
              <URLText noWrap>{moa.url}</URLText>
              <TitleText noWrap>{moa.title}</TitleText>
            </MoAItemText>
            <IconButton
              onClick={handleClick}
              sx={{ position: "absolute", right: 0, top: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
          </MoAItemCardTop>
          {/*  desc*/}
          <DescriptionText>{moa.desc}</DescriptionText>
        </MoAItemCardPaper>
      ) : (
        <MoAItemListPaper>
          <MoAItemListName>
            <LinkIcon fontSize="large" sx={{ mr: 1 }} />
            <MoAItemListNameTypography noWrap>
              {moa.name}
            </MoAItemListNameTypography>
          </MoAItemListName>
          <MoAItemListGraph>
            <MoAItemImg listType={listType === "list"}>
              <img
                src={moa.thumb ?? "https://via.placeholder.com/112x102"}
                alt={moa.title ?? moa.name ?? "섬네일 없음"}
              />
            </MoAItemImg>
            <MoAItemText>
              <ListTitleText noWrap>{moa.title}</ListTitleText>
              <ListURLText noWrap>{moa.url}</ListURLText>
              <ListDescriptionText>{moa.desc}</ListDescriptionText>
            </MoAItemText>
          </MoAItemListGraph>
          <MoAItemListButton>
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
          </MoAItemListButton>
        </MoAItemListPaper>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>링크 수정</ListItemText>
          </MenuItem>
          {/* todo 수정 다이얼로그 추가*/}
          <MenuItem>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>링크 삭제</ListItemText>
          </MenuItem>
          {/* todo 삭제 확인 창*/}
        </MenuList>
      </Menu>
    </>
  );
};

export default MoAItem;
