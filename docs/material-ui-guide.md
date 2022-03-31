# Material-UI React UI framework.

## [Customizing components](https://material-ui.com/guides/composition/)

### You can take advantage of the overrides key of the theme to potentially change every single style injected by Material-UI into the DOM. Learn more about it in the themes section of the documentation

```js
const normalTheme = createMuiTheme({
  palette: {
    ...palette,
    "primary": { "main": "#09b795", "light": "#5ceac6", "dark": "#008667", "contrastText": "#fafafa" },
    "secondary": { "main": "#526069", "light": "#7f8d97", "dark": "#29363e", "contrastText": "#ffffff" },
  },  
  typography: {
    ...typography
  }
})

normalTheme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused': {
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: '#192a42'
        }
      },
    },
  },
  MuiFormLabel: {
    root: {
      '&$focused': {
        color: "#192a42",
      },
    }
  }
```



# *Picking colors

## Official color tool

 [material.io/resources/color](https://material.io/resources/color/#!/?view.left=0&view.right=0)
# Default Theme
Here's what the theme object looks like with the default values.

https://material-ui.com/customization/default-theme/

