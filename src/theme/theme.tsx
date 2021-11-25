import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      trinary: string;
      error: string;
      background: string;
      text: string;
      default: string;
      success: string;
      warning: string;
      info: string;
    };
    screen: {
      tablet: string;
      laptop: string;
      desktop: string;
    };
    font: {
      family: { primary: string; secondary: string; tertiary: string };
      size: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
      };
      weight: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
      };
    };
  }
}

export const theme = {
  color: {
    primary: "#23b2ee",
    secondary: "#4A5587",
    trinary: "#7AED18",
    error: "#fa8282",
    background: "snow",
    text: "#737c8e",
    default: "#a95cf7",
    success: "#be9b00",
    warning: "#d81212",
    info: "#00a5bb",
  },
  screen: {
    tablet: "768px",
    laptop: "1366px",
    desktop: "1920px",
  },
  font: {
    family: {
      primary: `'Montserrat', sans-serif`,
      secondary: `'Roboto', sans-serif`,
      tertiary: `'Roboto', sans-serif`,
    },
    size: {
      xs: "12px",
      s: "14px",
      m: "16px",
      l: "24px",
      xl: "36px",
      xxl: "44px",
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
};
