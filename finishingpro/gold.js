class Gold extends LivigCreature{
    mul(){
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if(newCell && this.multiply >= 7){

            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 1 

            let gold = new Gold(newX,newY)
            goldArr.push(gold)

            this.multiply = 0 

        }
    }   
}
