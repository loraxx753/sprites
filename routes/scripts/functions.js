const logs = {}
export const logOnce = (key, msg) => {
    if(!Object.keys(logs).includes(key)) {
        logs[key] = msg
        console.log(msg)
    }
}
(async ()=> {
    console.once = logOnce
})()
