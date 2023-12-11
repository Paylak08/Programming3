// let express = require("express");
// let square = require("../square")
// let app = express();
// let a = new square(2)
// console.log(a.countSquare())

// app.use(express.static("."));

// app.get("/", function(req, res){
// res.redirect("index.html");
// });

// app.listen(3000, function(){
// console.log("Example is running on port 3000");
// });
// let fs = require('fs');

// function main() {
//     let file = "Paylak.txt";

//     fs.appendFileSync(file, "Hello world\n");
// }
// main();
// let fs = require('fs');
// function main() {
//     fs.writeFile("hello.txt", "Hello world\n", function (err) {
//         console.log("fs.writeFile ended");
//     });
//     console.log("fs.writeFile");
// }
// main();
let obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true 
}
let name = obj.name
let last_name = obj.last_name
let age = obj.age
let tumo = obj.tumo_student
JSON.stringify(name)
JSON.stringify(last_name)
JSON.stringify(age)
JSON.stringify(tumo_student)