export class Metodos_Pagamento {
  ident: number
  number: string;
  name_titular: string;
  cvv: number;
  flag: string;
  name: string;
  email: string;
  type: string;

  constructor(metodo_pagamento: Metodos_Pagamento) {
    this.type = metodo_pagamento.type;
    this.name = metodo_pagamento.name;
    if (this.type == "Cartao de Credito" || this.type == "Cartao de Debito") {
      this.number = metodo_pagamento.number;
      this.name_titular = metodo_pagamento.name_titular;
      this.cvv = metodo_pagamento.cvv;
      this.flag = metodo_pagamento.flag;
    }
    if (this.type == "PicPay"  || this.type == "PayPal") {
      this.email = metodo_pagamento.email;
    }
  }

  update(metodo_pagamento: Metodos_Pagamento): void {
    console.log("update de dentroo")
    console.log(metodo_pagamento);
      this.name = metodo_pagamento.name;
      if (this.type == "PicPay"  || this.type == "PayPal") {
        this.email = metodo_pagamento.email;
      }
  }
}