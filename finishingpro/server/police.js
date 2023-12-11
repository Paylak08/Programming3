let LivigCreature = require("./livingCreature")

module.exports = class Police extends LivigCreature{
    constructor(x, y){
        super(x, y)
        this.energy = 20
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
        
        return super.chooseCell(char1)
    }
    mul(){
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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
        let food = foods[Math.floor(Math.random() * foods.length)]

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
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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