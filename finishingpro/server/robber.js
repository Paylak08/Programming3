let LivigCreature = require("./livingCreature")

module.exports = class Robber extends LivigCreature{
    constructor (x, y){
        super(x, y)
        this.energy = 12
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
        return super.chooseCell(char1)
    }

    mul(){
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if(newCell){

            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 2

            let robber = new Robber(newX,newY)
            robberArr.push(robber)

           

        }
    }

    eat(){
        let foods = this.chooseCell(1)
        let food = foods[Math.floor(Math.random() * foods.length)]

        if(food){
            this.energy += 5
            let newX = food[0]
            let newY= food[1]

        matrix[newY][newX] = 2
        matrix[this.y][this.x] = 0 

            for(let i in robberArr){
                if(newX == goldArr[i].x && newY == goldArr[i].y){
                    goldArr.splice(i,1)

                    break;
                }
            }
            this.x = newX
            this.y = newY

            if(this.energy >= 27){
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
            this.energy--
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 2
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

        for(let i in robberArr){
            if(this.x == robberArr[i].x && this.y == robberArr[i].y){
                robberArr.splice(i,1)
                break;
            }
        }
    }


}