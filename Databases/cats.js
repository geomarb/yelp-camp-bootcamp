var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//add new db

// var george = new Cat({
//     name: "Miti",
//     age: 10,
//     temperament: "Cute"
// });

// george.save(function (err, cat) {
//     if (err) {
//         console.log("erro");
//     } else {
//         console.log("saved");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Tiao",
    age: 4,
    temperament: "Nice"
}, function(err, cat){
    if (err) {
        console.log("erro ao criar dados: ");
        console.log(err);
        } else {
            console.log("cat: ");
            console.log(cat);
        }
});

//retrieve all cats from db and show them

Cat.find({}, (err, cats) => {
    if (err) {
        console.log("erro ao buscar dados: ");
        console.log(err);
        } else {
            console.log("cats: ");
            console.log(cats);
        }
});