module.exports = class Square{
    constructor(num) {
        this.num = num
    }
    countSquare(){
        return this.num ** 2
    }
}