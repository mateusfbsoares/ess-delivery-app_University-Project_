import { Metodos_Pagamento } from "./metodos_pagamento";

export class Metodos_PagamentoService {
  metodosPagamento: Array<Metodos_Pagamento> = [];
  metodoName: string;
  metodoType: string;
  
  add(metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
    if (this.metodosPagamento.length == 5 || (this.metodoType != "Cartao de Credito" && this.metodoType != "Cartao de Debito" && this.metodoType != "Pix" && this.metodoType != "PicPay" && this.metodoType != "PayPal")) {
      return null;
    }
    const newMetodo = new Metodos_Pagamento(<Metodos_Pagamento> { type: this.metodoType, name: this.metodoName, ...metodos_pagamento });
    this.metodosPagamento.push(newMetodo);
    return newMetodo;
  }

  update(metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
    var result: Metodos_Pagamento = this.getByName(metodos_pagamento.name);
    if (result) {
      result.update(metodos_pagamento);     
    }
    return result;
  }

  get(): Metodos_Pagamento[] {
    return this.metodosPagamento;
  }
  
  getByName(mName: string) : Metodos_Pagamento {
    return this.metodosPagamento.find(metodo => metodo.name == mName);
  }
}