import React, { FC, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SearchForm, SearchIconButton, SearchInput } from "../style";
import { useForm, Controller } from "react-hook-form";
const SearchComponent: FC<SearchComponentProps> = ({ setKeyword }) => {
  const { control, handleSubmit } = useForm<KeywordSearchForm>({
    defaultValues: {
      keyword: "",
    },
  });
  const handleSearch = useCallback(
    (data: KeywordSearchForm) => {
      setKeyword(data.keyword);
    },
    [setKeyword]
  );
  return (
    <>
      <SearchForm onSubmit={handleSubmit(handleSearch)}>
        <Controller
          control={control}
          name="keyword"
          render={({ field: { value, onChange } }) => (
            <SearchInput
              placeholder="검색어를 입력하세요"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <SearchIconButton onClick={handleSubmit(handleSearch)}>
          <SearchIcon />
        </SearchIconButton>
      </SearchForm>
    </>
  );
};

export default SearchComponent;
