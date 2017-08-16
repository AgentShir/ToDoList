const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const shortid = require('shortid')
var jsonfile = require('jsonfile')
var file = '/tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj, "obj")
})


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'static')))

var todos = [];
var complete = [];

app.get("/", function(req, res, next){
  res.render("index", { todos: todos, complete: complete });
});

app.post("/", function (req, res) {
  todos.push({ id: shortid.generate(),
    text: req.body.text

  })
  res.redirect("/");
})

app.post("/complete", function(req, res, next){
  const id = req.body.id
  const completeTodo = todos.filter(function(item){
    return item.id === id
  })[0]
  complete.push(completeTodo)
  todos = todos.filter(function(item){
    return item.id !== id
  })
  res.redirect("/");
  
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
