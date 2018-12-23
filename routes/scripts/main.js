import './functions.js'

let count = 0;
let [ x, y, width, height ] = [ 0, 0, 10, 10 ];
let radius = 20;

(async () => {
    document.addEventListener('keypress', (e) => { 
        if(e.key.toLowerCase() == 'enter') {
        }
    })

    window.requestAnimationFrame(loop)
})()

async function loop() {
    count++;
    const canvasElement = document.querySelector('canvas')
    console.once(`X coordinates`, `x-boundaries (left 0 -> ${canvasElement.width})`)
    console.once(`Y coordinates`, `y-boundaries (top 0 -> ${canvasElement.height})`)

    const ctx = canvasElement.getContext('2d')
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.beginPath();
    ctx.arc(canvasElement.width/2, canvasElement.height/2, 40, 0, 2 * Math.PI);
    ctx.stroke();
    window.requestAnimationFrame(loop)

}