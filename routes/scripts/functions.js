import { colorDifference, scaleRGB, rgb2hsv } from './equations.js'
import { colors } from './constants.js'

const parsePixel = ({column:x, row:y}, canvas, overlay) => {
    const [red, green, blue, alpha ] = canvas.getContext('2d').getImageData(x, y, 1, 1).data
    let closestColor = {}
    let closestColorName = ''
    let closestDistance = 100000
    for(let colorName in colors) {
        const distance = colorDifference({red, green, blue}, colors[colorName])
        if(distance < closestDistance) {
            closestColor = colors[colorName]
            closestColorName = colorName
            closestDistance = distance
        }
    }
    
    overlay.getContext('2d').fillStyle = `rgb(${closestColor.red}, ${closestColor.green}, ${closestColor.blue})`
    overlay.getContext('2d').fillRect(x,y,1,1);
    console.log(closestColorName)
    // document.querySelector(`.swatch.${closestColorName} .totals`).innerHTML = Number(document.querySelector(`.swatch.${closestColorName} .totals`).innerHTML) + 1

    const scaledRGB = scaleRGB({red, green, blue})
    const hsv = rgb2hsv(scaledRGB)
    return {red, green, blue, alpha, ...hsv}
}

export function* parsePixels(canvas, overlay, img) {
    yield {
        pixels: canvas.width * canvas.height,
        rows:canvas.height, 
        columns:canvas.width,
        resolution: `${canvas.height}x${canvas.width}`
    } 
    for(let row=0; row < canvas.height; row++) {
        for(let column=0; column < canvas.width; column++) {
            yield parsePixel({column, row}, canvas, overlay)
        }
    }
    return pixels
}

