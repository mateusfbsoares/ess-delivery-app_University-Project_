import "jasmine";
import request = require("request-promise");
import { Metodos_Pagamento } from "../src/metodos_pagamento";

const baseUrl = "http://localhost:3000";

const promotionsUrl = `${baseUrl}/promotions`;
const paymentsUrl = `${baseUrl}/user/`;

describe("O servidor", () => {
	var server: any;

	beforeAll(() => {
		server = require("../server");
	});

	afterAll(() => {
		server.closeServer();
	});



    // teste cadastro, sucessoooo
	it("Cadastra novo método de pagamento válido cartao", () => {
		const body ={"type":"Cartao de Credito",
		"name":"nubank(**** **** **** 5554)",
		"number":"4004333344445554",
		"name_titular":"matheus ferreira",
		"cvv":345,
		"flag":"visa",
		"email":"",
		"ident": 1,
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl + 123 +"/metodos",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});
	
	//cadastra email válido
	it("Cadastra novo método de pagamento válido cartao", () => {
		const body ={"type":"PicPay",
		"name":"nubank(**** **** **** 5554)",
		"email":"abc@gmail.com",
		"ident": 1,
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl + 123 +"/metodos",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	//tenta cadastrar email inválido
	it("Cadastra novo método de pagamento inválido cartao", () => {
		const body ={"type":"PicPay",
		"name":"nubank(**** **** **** 5554)",
		"email":"abcgmail.com",
		"ident": 1,
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl + 123 +"/metodos",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	//tenta cadastrar método que já existe

	it("Cadastra método que já existe", () => {
		const body ={"type":"Cartao de Credito",
		"name":"nubank(**** **** **** 5554)",
		"number":"4004333344445554",
		"name_titular":"matheus ferreira",
		"cvv":345,
		"flag":"visa",
		"email":"",
		"ident": 1,
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl + 123 +"/metodos",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(404);
		});
	});

	//tenta cadastrar método inválido

	it("tenta cadastra método inválido", () => {
		const body ={"type":"Cartao de Credito",
		"name":"nubank(**** **** **** 5554)",
		"number":"4004333344445abcd554",
		"name_titular":"matheus ferreira",
		"cvv":345,
		"flag":"visa",
		"email":"",
		"ident": 1,
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl + 123 +"/metodos",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});



	//atualiza
	it("Atualiza um método de pagamento que existe", () => {

		const body ={"type":"Cartao de Credito",
		"name":"nubank(**** **** **** 3434)",
		"number":"4004333344443434",
		"name_titular":"matheus recife",
		"cvv":345,
		"flag":"visa",
		"email":"",
		"ident": 0,
		};

		const options: any = {
			method: "PUT",
			uri: baseUrl + "/user/123/metodos/0" ,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	//exclui método de pagamento 
	
	it("exlcui método de pagamento que existe", () => {
		
		const options: any = {
			method: "DELETE",
			uri: baseUrl +"/user/123/metodos/0",
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	//tenta excluir méto que nao exite
	it("exlcui método de pagamento que não existe", () => {
		
		const options: any = {
			method: "DELETE",
			uri: baseUrl +"/user/123/metodos/10",
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	//get user
	it("retorna usuário válido", () => {
		
		const options: any = {
			method: "GET",
			uri: baseUrl + '/users/123',
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	//tenta retornar usuário que não exxiste
	it("tenta retornar usuário que não existe", () => {
		
		const options: any = {
			method: "GET",
			uri: baseUrl + '/users/125',
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

  
});