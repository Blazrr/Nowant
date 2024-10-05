import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        pri: {
          "50": "#effaff",
          "100": "#daf3ff",
          "200": "#bdecff",
          "300": "#90e1ff",
          "400": "#5ccffe",
          "500": "#36b3fb",
          "600": "#279af1",
          "700": "#187edd",
          "800": "#1a65b3",
          "900": "#1b568d",
          "950": "#153556",
        },
        sec: {
          "50": "#fef2f3",
          "100": "#fee5e8",
          "200": "#fccfd7",
          "300": "#f9a8b5",
          "400": "#f5778d",
          "500": "#ed4d6e",
          "600": "#d92553",
          "700": "#b71946",
          "800": "#991841",
          "900": "#83183d",
          "950": "#49081c",
        },
      },
    },
  },
};
