import normal from './normal.theme'
import dark from './dark.theme'



const themes: { [index: string]: any } = {
    "dark": dark,
    "normal": normal,
}
export const DEFAULT_THEME = 'normal';

export default function getTheme(theme: string) {
    return themes[theme]
}