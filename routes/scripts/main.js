import { parsePixels } from './functions.js'
import { colors } from './constants.js';
import { hex2rgb, rgb2hex } from './equations.js'

(async () => {
    
    document.getElementById('key-color').addEventListener('submit', (e) => {
        e.preventDefault()
        const keyColor = e.target.querySelector('input[type="color"]').value
        parseColors(document.querySelector('apd-sprites img'))
        // parseEnvironment({ key:keyColor })
    })
})()

async function parseEnvironment(settings) {
    const [canvas, img] = [document.createElement('canvas'), document.createElement('img')]

    img.src = "_assets/sprites/spritesheet/environment.png"

    img.onload = async () => {
        document.body.appendChild(img)
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        document.body.removeChild(img)
        document.querySelector('apd-sprites[environement]').innerHTML = ''
        document.querySelector('apd-sprites[environement]').appendChild(canvas)
        

        const sequence = parsePixels(canvas, settings);
        const { pixels, rows, columns, resolution } = sequence.next().value

        let { value, done } = sequence.next()
        while(!done) {
            let { value:nextValue, done:nextDone } = sequence.next()
            value = nextValue
            done = nextDone
        }


    }
}

async function parseColors(img) {
    const key = '#383c3d'
    const canvas = document.createElement('canvas')
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    document.querySelector('apd-sprites').removeChild(document.querySelector('apd-sprites img'))
    document.querySelector('apd-sprites').appendChild(canvas)
    const sequence = parsePixels(canvas, img, { key });
    let { value, done } = sequence.next()
    let count = 0
    while(!done) {
        let { value:nextValue, done:nextDone } = sequence.next()
        value = nextValue
        done = nextDone
    }
    console.log("done")
}

async function parseOnlyColors() {
    const [canvas, overlay, img] = [document.createElement('canvas'), document.createElement('canvas'), document.createElement('img')]

    img.src = "_assets/sprites/spritesheet/colors.png"

    img.onload = async () => {
        document.body.appendChild(img)
        canvas.width = img.width;
        canvas.height = img.height;
        overlay.width = canvas.width
        overlay.height = canvas.height
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        document.body.removeChild(img)
        // document.body.appendChild(overlay)
        // document.body.appendChild(canvas)

        const sequence = parsePixels(canvas, overlay, img);
        const { pixels, rows, columns, resolution } = sequence.next().value
        const colorsUsed = [];
        let { value, done } = sequence.next()
        let count = 0
        while(!done) {
            let found = false
            const rgbCss = `#${value.red.toString(16)}${value.green.toString(16)}${value.blue.toString(16)}`
            colorsUsed.find(css => {
                if(rgbCss == css) found = true
            })
            if(!found) colorsUsed.push(rgbCss)
            count++
            let { value:nextValue, done:nextDone } = sequence.next()
            value = nextValue
            done = nextDone
        }

        for(let colorUsed of colorsUsed) {
            const div = document.createElement('div')
            div.style=`width:100px; height: 100px;background-color: ${colorUsed}`
            document.getElementsByTagName('color-palette')[0].appendChild(div)
        }
    }
}
