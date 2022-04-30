import { Coupon } from "./coupon";
import { product } from "./restaurants";
import { Metodos_PagamentoService } from "./metodos_pagamento-service";

export interface order {
    id: string;
    products: product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
}

export class user {
    id: string;
    name: string;
    //metodos_de_pagamento: Metodos_PagamentoService;
    orders: order[]; 
}