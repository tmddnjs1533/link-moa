import React, { FC, useEffect, useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
declare module "@mui/material/styles" {
  /**
   * 신규 Typography 속성 정의
   */
  // interface TypographyVariants {
  //   label: CSSProperties;
  // }
  // interface TypographyVariantsOptions {
  //   label?: CSSProperties;
  // }
  /**
   * 신규 palette color 정의
   * * 신규 color 를 정의할 때는 기존 palette 를 복사해서 정의한다
   */
  // interface Palette {
  //   borderGrey: Palette["primary"];
  // }
  // interface PaletteOptions {
  //   borderGrey: PaletteOptions["primary"];
  // }
}

/**
 * 신규 Typography 속성 정의
 */
// declare module "@mui/material/Typography" {
//   interface TypographyPropsVariantOverrides {
//     label: true;
//   }
// }

type ModeType = "light" | "dark";
export const ColorModeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});
const GlobalThemeProvider: FC<DefaultProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [init, setInit] = useState(false);
  const [mode, setMode] = React.useState<ModeType>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (newMode?: ModeType) => {
        if (newMode) {
          setMode(newMode);
        } else {
          setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        }
      },
    }),
    []
  );
  useEffect(() => {
    if (prefersDarkMode && mode === "light" && !init) {
      colorMode.toggleColorMode("dark");
      setInit(true);
    }
  }, [colorMode, init, mode, prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3E3E3E",
            ...(mode === "dark" && {
              main: "#ffffff",
              dark: "#3E3E3E",
            }),
          },
          background: {
            default: "#FBFBFB",
          },
          ...(mode === "dark" && {
            background: {
              default: "#3E3E3E",
              paper: "#2A2A2A",
            },
          }),
          ...(mode === "dark" && {
            error: {
              main: "#FFAE36",
            },
          }),
          text: {
            ...(mode === "light"
              ? {
                  primary: "#3E3E3E",
                  secondary: "#919191",
                }
              : {
                  primary: "#fff",
                  secondary: "#CBCBCB",
                }),
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1166,
            xl: 1536,
          },
        },
        typography: {
          h1: {
            fontFamily: '"S-CoreDream-8Heavy", sans-serif',
            fontSize: "32px",
          },
          h2: {},
          h3: {},
          h4: {},
          h5: {},
          h6: {},
          subtitle1: {},
          subtitle2: {},
          body1: {},
          body2: {},
          button: {
            fontFamily: '"S-CoreDream-4Regular", sans-serif',
            fontSize: 16,
          },
          fontSize: 12,
          fontFamily: [
            "Noto Sans KR",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Malgun Gothic"',
            '"맑은 고딕"',
            "helvetica",
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default GlobalThemeProvider;
