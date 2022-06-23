import React, { FC } from "react";
import {
  DescriptionText,
  MoAItemImg,
  MoAItemPaper,
  MoAItemText,
  MoAItemTop,
  NameText,
  TitleText,
  URLText,
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

const MoAItem: FC<MoAItemProps> = ({ moa }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MoAItemPaper>
      {/*  body*/}
      <MoAItemTop>
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
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
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
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>링크 삭제</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </MoAItemTop>
      {/*  desc*/}
      <DescriptionText>{moa.desc}</DescriptionText>
    </MoAItemPaper>
  );
};

export default MoAItem;
