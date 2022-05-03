import { Router } from 'express';
import { Metodos_Pagamento } from './src/metodos_pagamento';
import { Metodos_PagamentoService } from './src/metodos_pagamento-service';
import { UserService } from './src/user-service';

const routes = Router();

var usersService: UserService = new UserService();
var methodsService : Metodos_PagamentoService = new Metodos_PagamentoService();

//metodos
routes.get('/user/:id/metodos', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodos = usersService.users[index].metodos_de_pagamento.get();
    res.send(JSON.stringify(metodos));
  });

//metodo sozinho
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


  routes.get('/users', (req, res) => {
    res.send(usersService.getUsers());
  });


  //get user
  routes.get('/users/:id', (req, res) => {
    console.log("entroou get")
    let id = req.params.id;
    const user = usersService.getUserById(id);
    console.log(user)
    if(user) {
      const msg = `user found ${user.id}`;
      res.status(201).send(user);
      console.log();
    } else {
      const err = `user not found`;
      res.send(404).send(err);
    }
  });
  
  routes.post('/user/:id/metodos', function(req, res){
    console.log("entrou no poste");
    const userId = req.params.id;
    console.log(usersService.users)
    const index = usersService.getUserIndex(userId);
    console.log(userId);
    console.log(index);
    console.log("antes do cast");
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    console.log(metodo);
    try {
      console.log("antes result")
      const result = usersService.users[index].metodos_de_pagamento.add(metodo);
      console.log("resulta aqui:")
      console.log(result);
      if (result) {
        console.log("de bom 201")
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
    console.log("editar método \n antes:");
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const metodo: Metodos_Pagamento = <Metodos_Pagamento> req.body;
    console.log("antes")
    console.log(metodo.ident)
    console.log(usersService.users[index].metodos_de_pagamento)
    const result = usersService.users[index].metodos_de_pagamento.update(metodo.ident, metodo);
    console.log(result);
    if (result) {
      console.log("depois:")
      console.log(result);
      res.status(201).send(metodo);
    } else {
      res.status(404).send({ message: `Inconsistents datas.`});
    }
  });
  
  routes.delete('/user/:idUser/metodos/:idPay', function(req, res){

    console.log("entroou deleetee")
    const userId = req.params.idUser;
    const methodId = req.params.idPay;
    const index = usersService.getUserIndex(userId);
    console.log(methodId);
    console.log("printando service")
    console.log(methodsService);
    const metodo: Metodos_Pagamento = usersService.users[index].metodos_de_pagamento.getById(methodId);
    try {
      console.log("printando metodo:")
      console.log(metodo);
      const result = usersService.users[index].metodos_de_pagamento.remove(metodo);
      console.log(result);
    
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
