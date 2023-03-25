import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     containedLeft: true;
//     containedRight: true;
//   }
// }




let lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Raleway', sans-serif",
        },
      },
    },
    MuiCard:{
      styleOverrides:{
        root:{
          boxShadow: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px",
          borderRadius:10,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          // boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          borderRadius: 10,
          "& fieldset": {
            borderWidth: "0px !important",
          },
          "& input": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },
  },
  boxShadows: ["0px 5px 16px rgba(25,25,50,0.1)"],
});

lightTheme = responsiveFontSizes(lightTheme);


export { lightTheme };