import { colorDifference, scaleRGB, rgb2hsv, hex2rgb, rgb2hex } from './equations.js'
import { colors } from './constants.js'
let stop = false;

const parsePixel = ({column:x, row:y}, canvas, { key }) => {
    key = '#383c3d'
    let imgData = canvas.getContext('2d').getImageData(x, y, 1, 1)
    let [red, green, blue, alpha] = imgData.data
    if(rgb2hex({red, green, blue}) == key) {
        imgData.data[3] = 0 
        canvas.getContext('2d').putImageData(imgData, x, y)
    }
    return { red, green, blue, alpha }
}

export function* parsePixels(canvas, options = {}) {
    yield {
        pixels: canvas.width * canvas.height,
        rows:canvas.height, 
        columns:canvas.width,
        resolution: `${canvas.height}x${canvas.width}`
    } 
    for(let row=0; row < canvas.height; row++) {
        for(let column=0; column < canvas.width; column++) {
            yield parsePixel({column, row}, canvas, options)
        }
    }
    return null
}

