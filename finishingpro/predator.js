class Police{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 20
        this.directions = []
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y ],
            [this.x + 1, this.y ],
            [this.x - 1, this.y + 1],
            [this.x , this.y + 1],
            [this.x + 1, this.y + 1]
            ];
    }
    chooseCell(char1){
        this.getNewCoordinates()
        let found = []
    
        for(let i in this.directions){
            let x = this.directions[i][0]
            let y = this.directions[i][1]
    
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == char1){
                    found.push(this.directions[i])
                }
                // if (matrix[y][x] == char2){
                //     found.push(this.directions[i])
                // }
            }
        }
    
        return found
    }
    mul(){
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 3

            let pred = new Police(newX,newY)
            policeArr.push(pred)
        }
    }
    eat(){
        let foods = this.chooseCell(2)
        let food = random(foods)

        if(food){
            this.energy += 10
            let newX = food[0]
            let newY= food[1]

              matrix[newY][newX] = 3
              matrix[this.y][this.x] = 0 

            for(let i in robberArr){
                if(newX == robberArr[i].x && newY == robberArr[i].y){
                    robberArr.splice(i,1)

                    break;
                }
            }
            this.x = newX
            this.y = newY

            if(this.energy >= 50){
                this.mul()
            }
        }else{
            this.move()
        }
        
    }
    move(){
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if(newCell){
            this.energy -= 3
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            if(this.energy <= 0){
                this.die()
            }
        }
    }
    die(){
        matrix[this.y][this.x] = 0

        for(let i in policeArr){
            if(this.x == policeArr[i].x && this.y == policeArr[i].y){
                policeArr.splice(i,1)
                break;
            }
        }
    }
}