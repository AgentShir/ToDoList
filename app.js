const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
var jsonfile = require('jsonfile')
var file = '/tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

const todos = [];
let taskId = 0;

app.get("/", function(req, res, next){
  res.render("index", { todos: todos });
});

app.post("/", function (req, res) {
  todos.push(req.body.listtask);
  res.redirect('/');
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
