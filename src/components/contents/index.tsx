import { ToggleButtonGroup, ToggleButton, Container } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb";

const Contents: FC = () => {
  const [init, setInit] = useState(false);
  const [MoAList, setMoAList] = useState<MoA[]>([]);
  const [listType, setListType] = useState<"card" | "list">("card");

  useEffect(() => {
    if (MoAList.length === 0 && !init) {
      getDocs(collection(db, "moa")).then((snapshot) => {
        let newMoAList: MoA[] = [];
        snapshot.forEach((doc) => {
          const newMoA: MoA = {
            id: doc.id,
            ...doc.data(),
          };
          newMoAList.push(newMoA);
        });
        setMoAList(newMoAList);
      });
    }
    setInit(true);
  }, [MoAList.length, init]);

  const handleChange = useCallback(() => {
    setListType((prevType) => (prevType === "card" ? "list" : "card"));
  }, []);

  const handleSearch = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "moa"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "26px" }}>
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
          <SearchIconButton onClick={handleSearch}>
            <SearchIcon />
          </SearchIconButton>
        </SearchForm>
      </ContentsTopContainer>

      {/*  body*/}
      {MoAList && MoAList.length > 0 ? (
        MoAList?.map((moa) => <MoAItem key={moa.id} moa={moa} />)
      ) : (
        <div>추가한 링크가 없어요</div>
      )}
    </Container>
  );
};

export default Contents;
