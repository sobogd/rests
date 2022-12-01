import { createTheme } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

export const backgroundDefault = grey[900];
export const textDefaultColor = grey[100];

export const theme = createTheme({
  palette: {
    secondary: {
      main: teal[600],
      contrastText: textDefaultColor,
    },
    primary: {
      main: teal[600],
      contrastText: textDefaultColor,
    },
    background: {
      default: grey["A700"],
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
    button: { fontWeight: 100, color: textDefaultColor },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          background: backgroundDefault,
          padding: 0,
          margin: 0,
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
  },
});
