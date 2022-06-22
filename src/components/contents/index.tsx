import { ToggleButtonGroup, ToggleButton, Container } from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import MoAItem from "./MoAItem";
import {
  ContentsTopContainer,
  SearchForm,
  SearchIconButton,
  SearchInput,
} from "./style";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
const Contents: FC = () => {
  const [listType, setListType] = useState<"card" | "list">("card");
  const handleChange = useCallback(() => {
    setListType((prevType) => (prevType === "card" ? "list" : "card"));
  }, []);
  return (
    <Container maxWidth="lg">
      <ContentsTopContainer>
        {/*  top*/}
        <ToggleButtonGroup value={listType} onChange={handleChange}>
          {/*  list type select*/}
          <ToggleButton value="card" key="card">
            <ViewModuleIcon />
          </ToggleButton>

          <ToggleButton value="list" key="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {/*  search*/}
        <SearchForm>
          <SearchInput placeholder="입력하세요" value="csssss" />
          <SearchIconButton>
            <SearchIcon />
          </SearchIconButton>
        </SearchForm>
      </ContentsTopContainer>

      {/*  body*/}
      <MoAItem />
    </Container>
  );
};

export default Contents;
