let socket = io();

let side = 20
let weather = ''

function setup() {
    frameRate(10)
    createCanvas(50 * side, 50 * side)
}

function addGold(){
    socket.emit("add gold")
}

function SupRob(x,y){
    let obj = {
        x,
        y
    }
    socket.emit("SuperRobber", JSON.stringify(obj))
}

function winter(){
    weather = 'winter'
}
function autumn(){
    weather = 'autumn'
}
function spring(){
    weather = 'spring'
}
function summer(){
    weather = 'summer'
}

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(weather == 'winter' || weather == 'autumn'){
                    fill("white")
                } else if(weather == 'spring' || weather == 'summer'){
                    fill("yellow")
                } else{
                    fill("yellow")
                }
            } else if (matrix[y][x] == 2) {
                if (weather == 'winter' || weather == 'autumn'){
                    fill("#504A4B")
                }else if (weather == 'spring' || weather == 'summer'){
                    fill("black")
                } else{
                    fill("black")
                }
            } else if (matrix[y][x] == 3) {
                if(weather == 'winter'){
                    fill("#87CEEB")
                } else if(weather == 'autumn'){
                    fill("#03045E")
                } else if(weather == 'spring'){
                    fill("#61A5C2")
                } else if(weather == "summer"){
                    fill("blue")
                } else{
                    fill("blue")
                }
            } else if (matrix[y][x] == 4) {
                if (weather == 'winter'){
                    fill("#FF2400")
                } else if(weather == 'autumn'){
                    fill("#D9381E")
                } else if(weather == 'spring'){
                    fill("#8D021F")
                } else if(weather == 'summer'){
                    fill("red")
                }else{
                    fill("red")
                }
            } else if (matrix[y][x] == 5) {
                if (weather == 'winter'){
                    fill('8DB600')
                }else if (weather == 'autumn'){
                    fill('orange')
                } else if (weather == 'spring'){
                    fill('#009150')
                } else if (weather == 'summer'){
                    fill('#708238')
                } else {
                    fill("green")
                }
            } else {
                fill("gray")
            }


            rect(x * side, y * side, side, side)
        }
    }
}
function mouseClicked() {
    console.log(mouseX, mouseY);
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)