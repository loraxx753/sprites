// https://www.reddit.com/r/learnprogramming/comments/18vjlm/javascript_find_closest_color_in_an_array_of/
export const colorDifference = ({red:r1, green:g1, blue:b1}, {red:r2, green:g2, blue:b2}) => {
    return xyzDifference({x:r1, y:g1, z:b1}, {x:r2, y:g2, z:b2})
}

export const xyzDifference = ({x:x1, y:y1, z:z1}, {x:x2, y:y2, z:z2}) => {
    var sumOfSquares = 0;

    sumOfSquares += Math.pow(x1 -x2, 2);
    sumOfSquares += Math.pow(y1 - y2, 2);
    sumOfSquares += Math.pow(z1 - z2, 2);
    
    return Math.sqrt(sumOfSquares);
}

export const scaleRGB = ({red, green, blue}) => {
    return {red:red/255, green:green/255, blue:blue/255}
}

export const minmax = ({ red, green, blue }) => {
    let max, min = {}
    if(red >= green && red >= blue) max = { color: 'red', value: red  }
    else if(green >= red && green >= blue) max = { color: 'green', value: green  }
    else if(blue >= green && blue >= red) max = { color: 'blue', value: blue  }
    
    if(red <= green && red <= blue) min = { color: 'red', value: red }
    else if(green <= red && green <= blue) min = { color: 'green', value: green }
    else if(blue <= green && blue <= red) min = { color: 'blue', value: blue }

    return { min, max }
    
}

// https://www.wikiwand.com/en/HSL_and_HSV#/Conversion_RGB_to_HSV_used_commonly_in_software_programming
export const rgb2hsv = color => {
    let { red, green, blue } = color 
    let [hue, saturation, value] = Array(3).fill(3)

    const { min, max } = minmax(color)
    
    if(max.color == 'red') {
        hue = 60 * (0 + (green - blue)/(max.value - min.value))
    }
    else if(max.color == 'green') {
        hue = 60 * (2 + (blue - red)/(max.value - min.value))
    }
    else if(max.color == 'blue') {
        hue = 60 * (4 + (red - green)/(max.value - min.value))
    }

    saturation = (max.value - min.value) / max.value
    value = max.value

    return { hue, saturation, value }
}