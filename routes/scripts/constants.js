import { hex2rgb } from './equations.js'

function objToCSSVariables(prefix, obj, modifier) {
    let output = ''
    for(let key in obj) {
        output += `--${prefix}-${key}: ${modifier(obj[key])};\n`
        // console.log(`#${colorObj.red}${colorObj.green}${colorObj.blue}`)
    }
    return output

} 

export async function CSSVariablesToObj () {
    const resp = await fetch('/_assets/styles/theme.css').then(r => r.text())
    if(!resp.match(/\-\-color-[a-zA-Z\-]+/g)) return false

    const colorNames = resp.match(/\-\-color-[a-zA-Z\-]+/g).map(colorWithPrefix => colorWithPrefix.replace('--color-', ''))
    const result = {}
    for(let colorName of colorNames) {
        const hex = getComputedStyle(document.body).getPropertyValue(`--color-${colorName}`);
        const rgb = hex2rgb(hex)
        result[colorName] = rgb
    }
    return result
}

export const colors = (() => {
    return CSSVariablesToObj()
})()