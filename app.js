const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var redis = require("redis"),
    client = redis.createClient();

client.on('error', function(err) {
  console.log(err);
})

app.use(bodyParser.json());

app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function insert(create_key) {
  let id = Math.floor(Math.random()*10000).toString();
  client.set(id, create_key, redis.print);
  return id;
}

app.post('/local_answer/:id', function(req, res) {
  let id = req.params.id;
  client.set(id, JSON.stringify(req.body), redis.print);
  res.send('ok');
})

app.get('/receive_offer/:id', function(req, res) {
  let id = req.params.id;
  client.get(id, function(err, reply) {
  if (!reply) {
      res.send('error');
    } else {
      res.send(reply);
    }
  })
})


app.get('/receive_answer/:id', function(req, res) {
  let id = req.params.id;
  client.get(id, function(err, reply) {
    if (!reply) {
      res.send('error');
    } else {
      client.del(id);
      res.send(reply);
    }
  })
})

app.post('/join/:id', function(req, res) {
  let id = req.params.id;
  client.get(id, function(err, reply) {
    if (!reply) {
      res.send('error')
    } else {
      res.send(reply);
    }
  }) 
})

app.post('/create', function(req, res) {
  let id = insert(JSON.stringify(req.body));
  res.send(id);
})


app.get('/', function (req, res) {
  console.log('get');
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


