import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import getTheme, { DEFAULT_THEME } from './base.theme'

type ThemeContextType = {
  currentTheme: string;
  setTheme: (value: string) => void;
};

type Props = {
  children: React.ReactNode
}

const CustomThemeContext = React.createContext<ThemeContextType>({
  currentTheme: DEFAULT_THEME,
  setTheme: () => console.log('set theme'),
});

export const useCustomTheme = () => React.useContext(CustomThemeContext);


const CustomThemeProvider = (props: Props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props


  const currentTheme = localStorage.getItem('appTheme') || DEFAULT_THEME;

  const [themeName, _setThemeName] = useState(currentTheme)

  const theme = getTheme(themeName)

  const setThemeName = (name: string) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }
  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
export default CustomThemeProvider