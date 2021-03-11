const express = require('express');
let app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');


let urlencodedParser = bodyParser.urlencoded({ extended: false });



app.set('view engine', 'ejs');                                                  //для работы ejs
app.use('/public', express.static('public'));                                   //для стилей и картинок
server.listen(3000);


mongoose.connect(keys.mongoURI)
.then(() => console.log('\n..............  MongoDB connect  ..............'))
.catch(error => console.log("\n\n\n\n" + error))


app.get('/', function (req, res) {
  console.log(req.url);
  res.sendFile(__dirname + "/index.html");
})
app.post('/success', urlencodedParser, function (req, res) {
  console.log(req.url);
  console.log(req.body);
  res.render('success', {data: req.body});
})

console.log("Запуск сервера localhost:3000.....\n\n");
