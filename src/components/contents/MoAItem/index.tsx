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
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinkIcon from "@mui/icons-material/Link";
import MoAItemMenu from "./MoAItemMenu";
const MoAItem: FC<MoAItemProps> = ({ moa, listType }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // 메뉴 오픈
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    },
    []
  );
  // item click
  const handlePaperClick = useCallback(() => {
    const win = window.open(moa.url, "_blank", "noopener,noreferrer");
    if (!win) return;
    win.focus();
  }, [moa.url]);
  return (
    <>
      {listType === "card" ? (
        <MoAItemCardPaper onClick={handlePaperClick}>
          {/*  body*/}
          <MoAItemCardTop>
            <MoAItemImg>
              <img
                src={moa.thumb || "https://via.placeholder.com/112x102"}
                alt={(moa.title || moa.name) ?? "섬네일 없음"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://via.placeholder.com/112x102";
                }}
              />
            </MoAItemImg>

            <MoAItemText>
              <NameText noWrap className="link_active">
                {moa.name}
              </NameText>
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
                src={moa.thumb || "https://via.placeholder.com/112x102"}
                alt={moa.title || moa.name || "섬네일 없음"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://via.placeholder.com/112x102";
                }}
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
      <MoAItemMenu
        moa={moa}
        menuOpen={menuOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default MoAItem;
