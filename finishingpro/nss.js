class Nss extends LivigCreature{
    constructor(x, y){
        super(x, y)
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
    // move(){
    //     //let emptyCells = this.x + this.y
    //     let newCell = this.x + this.y//random(emptyCells)
    //     if(newCell){
 
    //         for(let y =0; y < matrix.length; y++){
    //             for(let x = 0; x < matrix[y].length; x++){
                    
    //             }
        
    //         }
    //         if(y + x == matrix.length - 1){
    //             let newX = newCell[0]
    //             let newY = newCell[1]
    //             matrix[newY][newX] = 4
    //             matrix[this.y][this.x] = 0
    //             this.x = newX
    //             this.y = newY
    //         }

    //     }

    // }
    mul(){
        let emptyCells = this.chooseCell(2,5)
        let newCell = random(emptyCells)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4

            let n = new Nss(newX,newY)
            nssArr.push(n)
        }
    }
    eat(){
        let foods = this.chooseCell(2,5)
        let food = random(foods)

        if(food){
            let newX = food[0]
            let newY= food[1]
              matrix[newY][newX] = 4
              matrix[this.y][this.x] = 4
            for(let i in robberArr){
                if(newX == robberArr[i].x && newY == robberArr[i].y){
                    robberArr.splice(i,1)
                    break;
                }
            }
            for(let i in supRobArr){
                if(newX == supRobArr[i].x && newY == supRobArr[i].y){
                    supRobArr.splice(i,1)
                    break;
                }
            }
            if(matrix[newY][newX] == 4){
                matrix[newY][newX] = 0
       }
            // this.x = newX
            // this.y = newY
            // matrix[newX][newY] = 0
            
           
        }else{
            // if(matrix[newY][NewX]== 4){
            //     matrix[newY][newX] = 0
            //     this.x = x
            //     this.y = y
            // }
        }
    
    }
    // die(){
    //     if(){

    //     }
    // }
}