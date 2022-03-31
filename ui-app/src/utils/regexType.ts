const regexMatch = {
    wordChar: /[^\w]/gi,
    wordCharAndDash: /^[\w-]+$/gi,
    whiteSpace: /\s/gi
}
const regexReplace = {
    wordCharAndDash: /[^\w-]/gi,
    specialChars:/[^a-zA-Z\d]/gi

}
export { regexMatch, regexReplace }