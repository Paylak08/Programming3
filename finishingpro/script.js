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
            if (i == j){//0 && j == 0) {
                matrix[i][j] = 4
            }// } else if (i == 0 && j == matrixSize-1) {
            //     matrix[i][j] = 4
            // }
        }
    }
    return matrix
}
let matrix = matrixGenerator(50, 75, 20, 40, 2)
let side = 17
let goldArr = []
let robberArr = []
let policeArr = []
let NSSArr = []
let supRobArr = []
function setup() {
    frameRate(10)
    createCanvas(matrix[0].length * side, matrix.length * side)
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
            }else if (matrix[y][x] == 5) {
                let rob = new SuperRobber(x, y)
                supRobArr.push(rob)
            }
        }
    }
}
function one(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] == 1){
                matrix[i][j] = 0
                for(let i in goldArr){
                    goldArr.splice(i,goldArr.length)
                    break;
                }
            }
        }
    }
}
function two(x,y){
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            let rob = new SuperRobber(x, y)
                supRobArr.push(rob)
        }
}
function draw() {
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
            }else if (matrix[y][x] == 5) {
                fill("green")
            } else {
                fill("gray")
            }


            rect(x * side, y * side, side, side)
        }
    }

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
}
console.log("Hello World");