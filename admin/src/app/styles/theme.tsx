import { createTheme } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const backgroundDefault = "#f9f7ff";
export const textDefaultColor = grey[900];
export const textDefaultWhiteColor = grey[50];
export const primaryColor = "#661fe7";
export const secondaryColor = "#07facb";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "body, html": {
          height: "100%",
          width: "100%",
          position: "fixed",
          overflow: "hidden",
        },
        "#root": {
          position: "relative",
          width: "100%",
          height: "100%",
        },
        "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
          margin: 0,
        },
        "html:focus-within": {
          scrollBehavior: "smooth",
        },
        "img, picture": {
          maxWidth: "100%",
          display: "block",
        },
        "input, button, textarea, select": {
          font: "inherit",
        },
        button: {
          border: "none",
          margin: 0,
          padding: 0,
          width: "auto",
          overflow: "visible",
          background: "transparent",
          color: "inherit",
          font: "inherit",
          lineHeight: "normal",
        },
        body: {
          minHeight: "100%",
          textRendering: "optimizeSpeed",
          lineHeight: 1.5,
          overflow: "hidden",
        },
        [`ul[role="list"], ol[role="list"]`]: {
          listStyle: "none",
        },
        "*,*::before,*::after": {
          boxSizing: "border-box",
          transition: "0.2s",
          fontWeight: 400,
          fontFamily: "'Roboto', sans-serif !important",
        },
        "@media print": {
          "#printableArea": {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `white !important`,
          },
          "#printableArea header": {
            display: "none",
          },
          "#printableArea footer": {
            display: "none",
          },
          "*": {
            color: "black !important",
            boxShadow: "none !important",
            background: `none !important`,
            overflow: "initial !important",
            fontWeight: `600 !important`,
          },
          "#noneForPrint1,#noneForPrint2,#noneForPrint3, #noneForPrint4,#noneForPrint5":
            {
              display: "none",
            },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundDefault,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: backgroundDefault,
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: textDefaultWhiteColor,
          svg: {
            color: textDefaultWhiteColor,
          },
          ".MuiTypography-root": {
            color: textDefaultWhiteColor,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: backgroundDefault,
          svg: {
            color: primaryColor,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: grey[800],
        },
        root: {
          borderColor: grey[800],
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "::before": {
            display: "none",
          },
          "::after": {
            display: "none",
          },
        },
        input: {
          borderRadius: 5,
          background: grey[200],
          color: grey[700],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          color: grey[700],
        },
        root: {
          "&.MuiInputLabel-shrink": {
            color: grey[900],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        filled: {
          color: grey[700],
          background: grey[200],
          borderRadius: 5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: grey[600],
          },
        },
        containedSizeLarge: {
          height: 56,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        icon: {
          ".MuiSvgIcon-root": {
            color: grey[700],
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderColor: grey[800],
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          color: grey[600],
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginLeft: -20,
          marginRight: -20,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: textDefaultColor,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          margin: "0",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          padding: "20px",
          height: "100%",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: "0",
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
  palette: {
    secondary: {
      main: secondaryColor,
      contrastText: textDefaultColor,
    },
    primary: {
      main: primaryColor,
      contrastText: textDefaultColor,
    },
    background: {
      default: backgroundDefault,
    },
    text: {
      primary: textDefaultColor,
      secondary: textDefaultColor,
    },
  },
  typography: {
    h1: {
      color: textDefaultColor,
      fontWeight: 400,
      fontSize: 24,
      padding: 0,
      margin: 0,
    },
    h2: { color: textDefaultColor, fontWeight: 100 },
    h3: { color: textDefaultColor, fontWeight: 100 },
    h4: { color: textDefaultColor, fontWeight: 100 },
    h5: { color: textDefaultColor, fontWeight: 100 },
    h6: { color: textDefaultColor, fontWeight: 100 },
    subtitle1: { color: textDefaultColor, fontWeight: 100 },
    subtitle2: { color: textDefaultColor, fontWeight: 100 },
    body1: { color: textDefaultColor, fontWeight: 100 },
    body2: { color: textDefaultColor, fontWeight: 100 },
    caption: { color: textDefaultColor, fontWeight: 100 },
    button: { fontWeight: 100, color: textDefaultWhiteColor },
  },
});
