import { User , Order} from "./users";
import { Coupon } from "./coupon";
import crypto = require('crypto');
import * as fs from 'fs';
import { Metodos_Pagamento } from "./metodos_pagamento";

export class UserService {
  users: User[] = [{
    name: "Mileto",
    id: "123",
    orders: [],
    metodos_de_pagamento : {
      metodosPagamento: [{"type":"Cartao de Credito",
      "name":"nubank(**** **** **** 5555)",
      "number":"4004333344445555",
      "name_titular":"matheus ferreira",
      "cvv":345,
      "flag":"visa",
      "email":"",
      "ident": 0,
      update:function(metodo_pagamento: Metodos_Pagamento): void {
        this.name = metodo_pagamento.name;
        if (this.type == "PicPay"  || this.type == "PayPal") {
          this.email = metodo_pagamento.email;
        }
    }

      }],
      identCount: 1,
      add : function (metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
        console.log("entrooou")
        if (this.metodosPagamento.length == 5 || this.getByName(metodos_pagamento.name) != null || (metodos_pagamento.type != "Cartao de Credito" && metodos_pagamento.type != "Cartao de Debito" && metodos_pagamento.type != "Pix" && metodos_pagamento.type != "PicPay" && metodos_pagamento.type != "PayPal")) {
          return null;
        }
        const newMetodo = new Metodos_Pagamento(<Metodos_Pagamento> { ident: this.identCount, ...metodos_pagamento });
        newMetodo.ident = this.identCount;
        this.identCount = this.identCount+1;
        console.log(newMetodo)
        this.metodosPagamento.push(newMetodo);
        return newMetodo;
      },
      update: function ( Id: number, metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
        var result: Metodos_Pagamento = this.getById(Id);
        if (result && this.getByName(metodos_pagamento.name) == null && result.name_titular == metodos_pagamento.name_titular && result.flag == metodos_pagamento.flag && result.cvv == metodos_pagamento.cvv && result.number == metodos_pagamento.number) {
          result.update(metodos_pagamento);
          return result;
        }
        else{
          return null;
        }
      },

      getByName:function(mName: string) : Metodos_Pagamento {
        return this.metodosPagamento.find((metodo: { name: string; }) => metodo.name == mName);
      },
      getById: function(Id: number) : Metodos_Pagamento {
        
        return this.metodosPagamento.find((metodo: { ident: number; }) => metodo.ident == Id);
      },
      remove:function(metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
        var r: number = this.metodosPagamento.indexOf(metodos_pagamento);
        if (this.metodosPagamento.length > 0 && r != -1) {
          var result: Metodos_Pagamento = this.metodosPagamento[r];
          this.metodosPagamento.splice(r,1);
          return result;
        }
        else{
          return null;
        }
      },
      get:function(): Metodos_Pagamento[] {
        return this.metodosPagamento;
      }
      
    }
},{
  name: "Mateus",
  id: "111",
  orders: [],
  metodos_de_pagamento :undefined
}];
  
  // retorna indice do usuario
  getUserIndex(userId: string){
    var result = this.users.findIndex(({ id }) => id == userId);
    return result;
  }
  
  // retorna usuario
  getUserById(userId: string) : User {
    return this.users.find(({ id }) => id == userId);
  }

  getOrderById(userId: string, orderId: string) : Order {
    var index = this.getUserIndex(userId);
    return this.users[index].orders.find(({ id }) => orderId == id);
  }

  // retorna todos os usuarios
  getUsers() : User[] {
    return this.users;
  }

  // retorna todos os pedidos de um determiando usuario
  getOrders(user: User) : Order[] {
    var index = this.getUserIndex(user.id);
    return this.users[index].orders;
  }

  // ------------------------------------------------------------------
  
  // adiciona um pedido ao usuário (após a finalização)
  addOrder(userIndex: number, order: Order): User {
    const idOrder = crypto.randomBytes(4).toString('HEX'); 

    const newOrder = <Order> { id: idOrder , ...order};
   
    this.users[userIndex].orders.push(newOrder);
 
    console.log(this.users[userIndex].orders);

    return this.users[userIndex];
  }

  // atualiza o valor do pedido (após aplicar o cupom)
  applyCouponInOrder(order: Order, coupon: Coupon) : Order {
    // ** vo ver se o carinha ja usou esse cupom outra vez (pqp) => tem que salvar os cupons (FUTURO!!!!)
    // ver se o amount do pedido é >= valor minimo do cupom
    if(order.amount >= coupon.minValue && order.coupon==undefined && coupon.status=="Ativo"){
      // se tudo der certo => aplica o cupom
      order.coupon = coupon; 
      order.amount = order.amount * (1 - coupon.discount); // por enquanto, é apenas porcentagem
    }
    
    return order;
  }

  // remove o cupom do pedido
  removeCoupon(order: Order) : Order {
    var discount = order.coupon.discount;
    order.amount = order.amount / (1 - discount); // por enquanto, é apenas porcentagem
    order.coupon = undefined; 
    
    return order;
  }

  // ------------------------------------------------------------------
  
  updateFile(){
    var fileName = "users.json";
    fs.writeFile(fileName, JSON.stringify(this.users), (err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`Arquivo ${fileName} atualizado!`);
      }
    })
  }
}