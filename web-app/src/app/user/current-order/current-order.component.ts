import { Component, OnInit } from '@angular/core';
import { Order, order } from '../orders/order';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Restaurant, Product } from 'src/app/admin/restaurant';
import { CurrentOrderService } from './current-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  localStorage = new LocalStorageService();

  data: any;
  type: string;
  rest: Restaurant;
  curOrder: Order;
  cupomName: string;

  constructor(private service: CurrentOrderService, private route: Router) {
    this.curOrder = order;
  }
  
  setZeroQuantity(){
    this.curOrder.products.forEach(product => product.quantity = 0);
  }
  
  insertCoupon() {

    this.service.insertCoupon(this.cupomName, this.curOrder)
      .then(res => {
        this.curOrder = res;
        if(this.curOrder.coupon) {
          alert("Cupom aplicado com sucesso!");
        } else {
          alert("Cupom não pode ser aplicado!");
        }
      })
  }

  back() {
    this.route.navigate(["user", this.data.id, "profile"]);
  }

  formatAmount(){
    return this.curOrder.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  updateAmount(){
    this.curOrder.amount = 0;
    this.curOrder.products.forEach(product => {
      this.curOrder.amount += (product.price * product.quantity);
    })
  }
  removeCoupon(){}
  confirmOrder(){}

  // e as de metodos de pagamento
  
  ngOnInit() {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
    // alert("cheguei");
    this.curOrder.address = this.data.address;
    this.service.getRestaurant("BK").then(res => {
      this.rest = res;
      // alert("rest =>" + this.rest);
      this.curOrder.products = this.rest.products;
      this.setZeroQuantity();
    });
    
  }

}

// - [ ]  fazer a tela de finalizar pedido: produtos e quantidades (caixa de seleção), restaurante e endereço de entrega, linkar com método de pagamento (essa rota já tem em tese)
// - [ ]  produtos e quantidades: é uma tabelinha normal no front
//     1. cria pedido no back (é o arquivo)
//     2. enquanto o carinha estiver logado eu to mandando esse pedido entre as páginas
//     3. Fazer botão de salvar alterações ⇒ put pra curr-order // menor prioridade da vida
