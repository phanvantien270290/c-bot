const palette = {
  "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" },
  "warning": { "light": "#ffb74d", "main": "#ff9800", "dark": "#f57c00", "contrastText": "rgba(0, 0, 0, 0.87)" },
  "info": { "light": "#64b5f6", "main": "#2196f3", "dark": "#1976d2", "contrastText": "#fff" },
  "success": { "light": "#81c784", "main": "#4caf50", "dark": "#388e3c", "contrastText": "rgba(0, 0, 0, 0.87)" },
  "text": { "primary": "#263238", "secondary": "#546e7a", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" },
  "divider": "rgba(0, 0, 0, 0.12)",
}
const typography = {
  "h1": {
    "fontSize": "1.59375rem", "lineHeight": 1.167, "letterSpacing": "-0.24px",
    "fontWeight": 500,
    "@media (min-width:600px)": {
      "fontSize": "1.928rem"
    },
    "@media (min-width:960px)": {
      "fontSize": "2.1422rem"
    },
    "@media (min-width:1280px)": {
      "fontSize": "2.1422rem"
    }
  },
  "h2": {
    "fontSize": "1.40625rem",
    "lineHeight": 1.2,
    "fontWeight": 500,
    "letterSpacing": "-0.24px",
    // "@media (min-width:600px)": "{fontSize: \"1.6667rem\"}",
    // "@media (min-width:960px)": "{fontSize: \"1.6667rem\"}",
    // "@media (min-width:1280px)": "{fontSize: \"1.875rem\"}"
  },
  "h3": {
    "fontSize": "1.25rem",
    "lineHeight": 1.167,
    "fontWeight": 500,
    "letterSpacing": "-0.06px",
    // "@media (min-width:600px)": "{fontSize: \"1.2853rem\"}",
    // "@media (min-width:960px)": "{fontSize: \"1.4996rem\"}",
    // "@media (min-width:1280px)": "{fontSize: \"1.4996rem\"}"
  },
  "h4": {
    "fontSize": "1.125rem",
    "lineHeight": 1.235,
    "fontWeight": 500,
    "letterSpacing": "-0.06px",
    // "@media (min-width:600px)": "{fontSize: \"1.2146rem\"}",
    // "@media (min-width:960px)": "{fontSize: \"1.2146rem\"}",
    // "@media (min-width:1280px)": "{fontSize: \"1.2146rem\"}"
  },
  "h5": {
    "fontWeight": 500,
    "fontSize": 16,
    "lineHeight": 1.334,
    "letterSpacing": "-0.05px"
  },
  "h6": {
    "fontWeight": 500,
    "fontSize": 14,
    "lineHeight": 1.6,
    "letterSpacing": "-0.05px"
  },
};
export { palette, typography }