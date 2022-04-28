import { Router } from 'express';
import { Metodos_Pagamento } from './src/metodos_pagamento';
import { UserService } from './src/user-service';

const routes = Router();

var usersService: UserService = new UserService();

routes.get('/user/:id/metodos', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodos = usersService.users[index].metodos_de_pagamento.get();
    res.send(JSON.stringify(metodos));
  });
  
  routes.get('/user/:id/metodos/:ident', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const Id = req.params.ident;
    const metodo = usersService.users[index].metodos_de_pagamento.getById(Id);
    if (metodo) {
      res.send(metodo);
    } else {
      res.status(404).send({ message: `Method ${Id} could not be found`});
    }
  });
  
  routes.post('/user/:id/metodos', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    try {
      const result = usersService.users[index].metodos_de_pagamento.add(metodo);
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
  
  routes.put('/user/:id/metodos/:ident', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    const result = usersService.users[index].metodos_de_pagamento.update(metodo.ident, metodo);
    if (result) {
      res.send(metodo);
    } else {
      res.status(404).send({ message: `Inconsistents datas.`});
    }
  });
  
  routes.delete('/user/:id/metodos', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    try {
      const result = usersService.users[index].metodos_de_pagamento.remove(metodo);
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
