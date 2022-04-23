import { Router } from 'express';
import { Metodos_PagamentoService } from './src/metodos_pagamento-service';
import { Metodos_Pagamento } from './src/metodos_pagamento';

const routes = Router();

var metodosService: Metodos_PagamentoService = new Metodos_PagamentoService();

routes.get('/metodos', function(req, res){
    const metodos = metodosService.get();
    res.send(JSON.stringify(metodos));
  });
  
  routes.get('/metodos/:ident', function(req, res){
    const Id = <number> req.body.ident;
    const metodo = metodosService.getById(Id);
    if (metodo) {
      res.send(metodo);
    } else {
      res.status(404).send({ message: `Method ${Id} could not be found`});
    }
  });
  
  routes.post('/metodos', function(req, res){
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
  
  routes.put('/metodos/:ident', function(req, res){
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    const result = metodosService.update(metodo.ident, metodo);
    if (metodo) {
      res.send(metodo);
    } else {
      res.status(404).send({ message: `Inconsistents datas.`});
    }
  });
  
  routes.delete('/metodos', function(req, res){
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

export default routes;