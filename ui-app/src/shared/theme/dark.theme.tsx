import { createTheme } from '@mui/material/styles';
import { palette, typography } from './config.theme';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // ...palette,
    "primary": { "main": "rgba(203, 203, 210, 0.15)", "light": "#ffffff", "dark": "#f5f7f9", "contrastText": "#192a42" },
    "secondary": { "main": "#192a42", "light": "#43526d", "dark": "#00001c", "contrastText": "#ffffff" },
    "text": {
      "primary": "red",
      "secondary": "#ffffff",
      "disabled": "rgba(255, 255, 255, 0.5)"
    },
  },

  typography: {
    ...typography
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&$focused': {
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: '#192a42'
            }
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&$focused': {
            color: "#192a42",
          },
        }
      }
    }
  }
})

export default darkTheme;