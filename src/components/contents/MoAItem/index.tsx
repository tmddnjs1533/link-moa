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
const MoAItem: FC = () => {
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
            src="https://studiomeal.com/wp-content/uploads/2020/02/grid-og.jpg"
            alt="이번에야말로 CSS Grid를 익혀보자"
          />
        </MoAItemImg>

        <MoAItemText>
          <NameText noWrap>CSS grid 설명</NameText>
          <URLText noWrap>https://studiomeal.com/archives/533</URLText>
          <TitleText noWrap>
            이번에야말로 CSS Grid를 익혀보자 – 1분코딩
          </TitleText>
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
      <DescriptionText>
        이 포스트에는 실제 코드가 적용된 부분들이 있으므로, 해당 기능을 잘
        지원하는 최신 웹 브라우저로 보시는게 좋습니다. (대충 인터넷
        익스플로러로만 안보면 된다는 이야기) 이 튜토리얼은 “차세대 CSS 레이아웃”
        시리즈의 두번째 포스트입니다.혹시…
      </DescriptionText>
    </MoAItemPaper>
  );
};

export default MoAItem;
