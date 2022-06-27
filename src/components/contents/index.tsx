import {
  ToggleButtonGroup,
  ToggleButton,
  Container,
  CircularProgress,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import MoAItem from "./MoAItem";
import { ContentsTopContainer } from "./style";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import useMoA from "hooks/useMoA";
import MoAMobileItem from "./MoAMobileItem";
import SearchComponent from "./search";
import MoAListSkeleton from "./skeleton/MoAListSkeleton";
import MoACardSkeleton from "./skeleton/MoACardSkeleton";
import MoAMobileSkeleton from "./skeleton/MoAMobileSkeleton";

const Contents: FC = () => {
  const theme = useTheme();
  const [listType, setListType] = useState<MoAListType>("card");
  const [keyword, setKeyword] = useState("");
  const { isLoading, data: MoAList, isFetching } = useMoA(keyword);
  const handleChange = useCallback(() => {
    setListType((prevType) => (prevType === "card" ? "list" : "card"));
  }, []);
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "26px" }}>
      <ContentsTopContainer>
        {/*  top*/}
        <ToggleButtonGroup
          value={listType}
          onChange={handleChange}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {/*  list type select*/}
          <ToggleButton value="card" key="card">
            <ViewModuleIcon />
          </ToggleButton>

          <ToggleButton value="list" key="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {isFetching && <CircularProgress />}
        {/*  search*/}
        <SearchComponent setKeyword={setKeyword} />
      </ContentsTopContainer>

      {/*  body*/}
      {!isLoading && MoAList ? (
        MoAList.length > 0 ? (
          <Grid container spacing={3}>
            {MoAList?.map((moa) => (
              <Grid item xs={12} md={listType === "card" ? 4 : 12} key={moa.id}>
                {matches ? (
                  <MoAItem moa={moa} listType={listType} />
                ) : (
                  <MoAMobileItem moa={moa} />
                )}
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>추가한 링크가 없어요</div>
        )
      ) : !matches ? (
        <MoAMobileSkeleton />
      ) : listType === "card" ? (
        <MoACardSkeleton listType={listType} />
      ) : (
        <MoAListSkeleton listType={listType} />
      )}
    </Container>
  );
};

export default Contents;
