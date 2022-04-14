import express = require('express');
import bodyParser = require("body-parser");

import { Metodos_PagamentoService } from './src/metodos_pagamento-service';
import { Metodos_Pagamento } from './src/metodos_pagamento';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

var metodosService: Metodos_PagamentoService = new Metodos_PagamentoService();

app.get('/metodos', function(req, res){
  const metodos = metodosService.get();
  res.send(JSON.stringify(metodos));
});

app.get('/metodos/:ident', function(req, res){
  const Id = req.body.ident;
  const metodo = metodosService.getById(Id);
  if (metodo) {
    res.send(metodo);
  } else {
    res.status(404).send({ message: `Method ${Id} could not be found`});
  }
});

app.post('/metodos', function(req: express.Request, res: express.Response){
  const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
  try {
    const result = metodosService.add(metodo);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Method list is full, method name is already exist or method type is invalid."});
    }
  } catch (err) {
    const {message} = err;
    res.status(400).send({ message })
  }
});

app.put('/metodos/:ident', function(req: express.Request, res: express.Response){
  const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
  const result = metodosService.update(metodo.ident, metodo);
  if (metodo) {
    res.send(metodo);
  } else {
    res.status(404).send({ message: `Inconsistents datas.`});
  }
});

app.delete('/metodos', function(req: express.Request, res: express.Response){
  const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
  try {
    const result = metodosService.remove(metodo);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Method list is void or method does not exist."});
    }
  } catch (err) {
    const {message} = err;
    res.status(400).send({ message })
  }
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }
