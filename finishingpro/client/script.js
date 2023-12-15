var socket = io();

side = 20

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

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("yellow")
            } else if (matrix[y][x] == 2) {
                fill("black")
            } else if (matrix[y][x] == 3) {
                fill("blue")
            } else if (matrix[y][x] == 4) {
                fill("red")
            } else if (matrix[y][x] == 5) {
                fill("green")
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