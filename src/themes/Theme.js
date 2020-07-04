import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import grey from "@material-ui/core/colors/grey";

const Theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: grey
  },
  typography: {
    fontFamily: [
      "Barlow",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default Theme;
