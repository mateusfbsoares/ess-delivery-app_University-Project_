import { Order } from "../user/orders/order";
import { Coupon } from "./coupon";
import { Product } from "./restaurant";

export interface User {
    name: string;
    id: string;
    orders: Order[];
    paymentMethods: String[] // tem que adicionar metodo de pagamento aqui
}