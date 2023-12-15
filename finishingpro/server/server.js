var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("../client"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

function matrixGenerator(matrixSize, goldCount, robberCount, policeCount, NSSCount, supRobCount) {
    let matrix = []
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)
        }
    }
    for (let i = 0; i < goldCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }

    }
    for (let i = 0; i < robberCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }

    }
    for (let i = 0; i < policeCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < matrixSize; i++) {

        for (let j = 0; j < matrixSize; j++) {
            if (i == j) {
                matrix[i][j] = 4
            }
        }
    }
    return matrix
}

matrix = matrixGenerator(50, 75, 20, 40, 2)

io.sockets.emit('send matrix', matrix)

goldArr = []
robberArr = []
policeArr = []
NSSArr = []
supRobArr = []

Gold = require('./gold')
Robber = require('./robber')
SuperRobber = require('./superRob')
Police = require('./police')
Nss = require('./nss')

function one() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                matrix[i][j] = 0
                for (let i in goldArr) {
                    goldArr.splice(i, goldArr.length)
                    break;
                }
            }
        }
    }
}

function two(obj) {
    let cord = JSON.parse(obj);
    let x = cord.x;
    let y = cord.y
    if (matrix[y][x] == 0) {
        matrix[y][x] = 5
        let rob = new SuperRobber(x, y)
        supRobArr.push(rob)
    }
}

function object(matrix){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gold = new Gold(x, y)
                goldArr.push(gold)
            } else if (matrix[y][x] == 2) {
                let robber = new Robber(x, y)
                robberArr.push(robber)
            } else if (matrix[y][x] == 3) {
                let pred = new Police(x, y)
                policeArr.push(pred)
            } else if (matrix[y][x] == 4) {
                let nss = new Nss(x, y)
                NSSArr.push(nss)
            } else if (matrix[y][x] == 5) {
                let rob = new SuperRobber(x, y)
                supRobArr.push(rob)
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}

function game(){
    for (let i in goldArr) {
        goldArr[i].mul()
    }
    for (let i in robberArr) {
        robberArr[i].eat()
    }
    for (let i in policeArr) {
        policeArr[i].eat()
    }
    for (let i in NSSArr) {
        NSSArr[i].eat()
    }
    for (let i in supRobArr) {
        supRobArr[i].eat()
    }
    if (goldArr.length == 0) {
        let x1 = Math.floor(Math.random() * matrix.length)
        let y1 = Math.floor(Math.random() * matrix.length)
        if (matrix[y1][x1] != 2 && matrix[y1][x1] != 3) {
            matrix[y1][x1] = 1
            let gold = new Gold(x1, y1)
            goldArr.push(gold)
        }
    }
    if (robberArr.length == 0) {
        let x1 = Math.floor(Math.random() * matrix.length)
        let y1 = Math.floor(Math.random() * matrix.length)
        if (matrix[y1][x1] != 3) {
            matrix[y1][x1] = 2
            let robber = new Robber(x1, y1)
            robberArr.push(robber)
        }
    }
    if (policeArr.length == 0) {
        let x1 = Math.floor(Math.random() * matrix.length)
        let y1 = Math.floor(Math.random() * matrix.length)
        matrix[y1][x1] = 3
        let p = new Police(x1, y1)
        policeArr.push(p)
    }

    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 1000)

io.on('connection', function(socket){
    object(matrix);
    socket.on("add gold", one)
    socket.on("SuperRobber", two)
})