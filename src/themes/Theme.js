import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import lgreen from "@material-ui/core/colors/lightGreen";

const Theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lgreen
  },
  typography: {
    fontFamily: [
      "Dosis",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default Theme;
