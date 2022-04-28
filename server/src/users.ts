import { Coupon } from "./coupon";
import { product } from "./restaurants";
import { Metodos_PagamentoService } from "./metodos_pagamento-service";

export interface Order {
    id: string;
    products: product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
}

export interface User {
    name: string;
    id: string;
    orders: Order[];
    metodos_de_pagamento: Metodos_PagamentoService; 
}