import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const interFont = Inter({ subsets: ["latin"] });

const themeConfig = {
  accentColor: "#e6bb33",
  textColorDark: "#181A20",
};

let defaultTheme = createTheme({
  palette: {
    primary: {
      main: themeConfig.accentColor,
    },
    text: {
      primary: themeConfig.textColorDark,
    },
  },
});

defaultTheme = createTheme(defaultTheme, {
  typography: {
    allVariants: {
      fontFamily: [interFont.style.fontFamily, "sans-serif"].join(","),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      
      `,
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "0",
          },

          "& .MuiInputBase-root fieldset legend": {
            maxWidth: "100%",
          },

          "& .MuiFormLabel-root": {
            transform: "translate(14px, -9px) scale(.75)",
            "&.Mui-focused": {
              color: themeConfig.accentColor,
              transition: "color 10ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            },
            // color: "rgba(0, 0, 0, 0.33)",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "#fff",
            backgroundColor: themeConfig.accentColor,
            "&:hover": {
              backgroundColor: AdjustBrightness(themeConfig.accentColor, -0.4),
              boxShadow: "none",
            },
            boxShadow: "none",
          },
        },
      ],
      // styleOverrides: {
      //   root: {
      //     boxShadow: "none",
      //     borderRadius: "0",
      //     textTransform: "none",
      //     "&:hover": {
      //       boxShadow: "none",
      //       // parse themeConfig.accentColor hex number and lighten by 20%
      //       backgroundColor: AdjustBrightness(themeConfig.accentColor, 0.25),
      //     },
      //   },
      // },
    },
  },
});

// write function to modify hex brightness
function AdjustBrightness(color: string, modifier: number): string {
  const newColor = color.match(/[a-f0-9]{2}/gi);

  if (!newColor) return color;

  const result = newColor
    .map((hex) => Math.min(255, parseInt(hex, 16) + 255 * modifier * 0.25))
    .map((num) => Math.round(num).toString(16).padStart(2, "0"))
    .join("");

  return `#${result}`;
}

export default defaultTheme;
