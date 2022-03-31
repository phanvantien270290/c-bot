import { createTheme } from '@mui/material/styles';
import { palette, typography } from './config.theme';

const normalTheme = createTheme({
  palette: {
    ...palette,
    "primary": { "main": "#09b795", "light": "#5ceac6", "dark": "#008667", "contrastText": "#fafafa" },
    "secondary": { "main": "#526069", "light": "#7f8d97", "dark": "#29363e", "contrastText": "#ffffff" },
  },
  typography: {
    ...typography
  }
})

// normalTheme.overrides = {
//   MuiOutlinedInput: {
//     root: {
//       '&$focused': {
//         '& fieldset.MuiOutlinedInput-notchedOutline': {
//           borderColor: '#192a42'
//         }
//       },
//     },
//   },
//   MuiFormLabel: {
//     root: {
//       '&$focused': {
//         color: "#192a42",
//       },
//     }
//   }
// };

export default normalTheme;