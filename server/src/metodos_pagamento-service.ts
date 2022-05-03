import { Metodos_Pagamento } from "./metodos_pagamento";

export class Metodos_PagamentoService {
  metodosPagamento: Array<Metodos_Pagamento> = [];
  identCount: number = 0;
  
  add(metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
    console.log("entrou 2")
    if (this.metodosPagamento.length == 5  || (metodos_pagamento.type != "Cartao de Credito" && metodos_pagamento.type != "Cartao de Debito" && metodos_pagamento.type != "Pix" && metodos_pagamento.type != "PicPay" && metodos_pagamento.type != "PayPal")) {
      return null;
    }
    console.log("depois if gigante");
    if(this.metodosPagamento.find(metodo => metodo == metodos_pagamento)){
      console.log("pedido iguaaal")
      return null;
    }
      

    //checa se e-mail possui arroba
    if(metodos_pagamento.type == "PayPal" || metodos_pagamento.type == "PicPay"){
      let email = metodos_pagamento.email;
      let regexvalidation = /^([a-z]){1,}([a-z0-9.-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
      if(regexvalidation.test(email) == false)return null;
    }
    console.log("antes if gigante");
    //validação cartao servidor
    if(metodos_pagamento.type == "Cartao de Credito" || metodos_pagamento.type == "Cartao de Debito"){

      if(isNaN(Number(metodos_pagamento.number)) == true){
        return null;
      }

      if( String(metodos_pagamento.number).length != 16 ){
        return null
      }
      if( String(metodos_pagamento.cvv).length != 3 ){
        return null  
      }

      if( metodos_pagamento.name_titular == undefined ){
        return null
      }
      if( metodos_pagamento.flag != "visa" && metodos_pagamento.flag != "master"  ){
        return null
      }
      if( metodos_pagamento.name == undefined ){
        return null
      }
    }
    
    const newMetodo = new Metodos_Pagamento(<Metodos_Pagamento> { ident: this.identCount, type: metodos_pagamento.type, name: metodos_pagamento.name, ...metodos_pagamento });
    this.identCount = this.identCount+1;
    this.metodosPagamento.push(newMetodo);
    console.log("no add:")
    console.log(newMetodo)
    return newMetodo;
  }

  update( Id: number, metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
    console.log("antes if2");
    var result: Metodos_Pagamento = this.getById(Id);
    
    if (result) {
      
      if(metodos_pagamento.type == "PayPal" || metodos_pagamento.type == "PicPay"){
        if(metodos_pagamento.email.split('@').length != 2)return null;
      }
      result.update(metodos_pagamento);
      return result;
    }
    else{
      return null;
    }
  }

  remove(metodos_pagamento: Metodos_Pagamento): Metodos_Pagamento {
    var r: number = this.metodosPagamento.indexOf(metodos_pagamento);
    if (this.metodosPagamento.length > 0 && r != -1) {
      var result: Metodos_Pagamento = this.metodosPagamento[r];
      this.metodosPagamento.splice(r,1);
      return result;
    }
    else{
      return null;
    }
  }

  get(): Metodos_Pagamento[] {
    return this.metodosPagamento;
  }
  
  getByName(mName: string) : Metodos_Pagamento {
    return this.metodosPagamento.find(metodo => metodo.name == mName);
  }

  getById(Id: number) : Metodos_Pagamento {
    return this.metodosPagamento.find(metodo => metodo.ident == Id);
  }
}