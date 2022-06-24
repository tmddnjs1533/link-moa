import React, { FC, useContext } from "react";
import {
  MoAMobileItemBottom,
  MoAMobileItemPaper,
  MoAMobileItemTop,
} from "./style";
import {
  DescriptionText,
  MoAItemImg,
  MoAItemText,
  NameText,
  TitleText,
  URLText,
} from "../MoAItem/style";
import { EditModeContext } from "contexts/MobilEditMode";
import { DialogShadowIconButton } from "../../addMoA/style";
import EditIcon from "@mui/icons-material/Edit";

const MoAMobileItem: FC<MoAMobileItemProps> = ({ moa }) => {
  const [mode] = useContext(EditModeContext);
  return (
    <MoAMobileItemPaper>
      <MoAMobileItemTop>
        <MoAItemText>
          <NameText noWrap>{moa.name}</NameText>
          <URLText noWrap>{moa.url}</URLText>
        </MoAItemText>
        <MoAItemImg>
          <img
            src={moa.thumb ?? "https://via.placeholder.com/112x102"}
            alt={moa.title ?? moa.name ?? "섬네일 없음"}
          />
        </MoAItemImg>
      </MoAMobileItemTop>
      <MoAMobileItemBottom>
        <TitleText noWrap>{moa.title}</TitleText>
        <DescriptionText>{moa.desc}</DescriptionText>
      </MoAMobileItemBottom>
      {mode && (
        <DialogShadowIconButton>
          <EditIcon />
        </DialogShadowIconButton>
      )}
    </MoAMobileItemPaper>
  );
};

export default MoAMobileItem;
