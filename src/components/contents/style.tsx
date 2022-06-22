import { styled, Box, InputBase, IconButton } from "@mui/material";

export const ContentsTopContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 48px;
  margin-bottom: 38px;
`;

export const SearchForm = styled("form")`
  height: 48px;
  display: flex;
`;

export const SearchInput = styled(InputBase)`
  width: 300px;
  padding: 0 16px;
  margin-right: 8px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
`;

export const SearchIconButton = styled(IconButton)`
  width: 48px;
  border-radius: 0;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.background.paper};
`;
