import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const baseURL = 'http://localhost:4200/';
const loginURL = baseURL + 'login/';
const userURL =  baseURL + 'user/';
const restURL =  baseURL + 'rest/';
const adminURL =  baseURL + 'admin/';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const login = async (id, url) => {
    await browser.get(url); 
    await $("input[name='login']").sendKeys(<string> id); // preenche o input login
    await $("a[name='login']").click(); // clica no botão login
}

const toAddCoupon = async () => {
    await $("a[name='add-coupon']").click(); // clica no botão de adicionar cupom
} 

const addCoupon = async (couponName, discount, minValue, product, status) => {
    await $("input[name='minValue-box']").sendKeys(<number> minValue);
    await $("input[name='discount-box']").sendKeys(<number> discount);
    await $("input[name='name-box']").sendKeys(<string> couponName);
    await $("options[name='product']").filter(p => p.getText().then(name => name == product)).click(); // linha possível de dar problema
    if(status == "Ativo") {
        await $("input[name='status-box']").click();
    }
    await toAddCoupon();
}

const clickAlert = async (action) => {
    var alert = await browser.switchTo().alert();
    if("yes") {
        await alert.accept(); 
    }else{
        await alert.dismiss(); 
    }
}  

const getCouponList = () => $("td[name='coupon-name']");

// RESTAURANTE TENTA CADASTRAR UM CUPOM
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^o restaurante "([^\"]*)" está na página de cadastro de cupom$/, async (restName) => {
        await login(restName, loginURL + '/rest');
        await toAddCoupon();
    });
    When(/^o restaurante "([^\"]*)" tenta cadastrar o cupom "([^\"]*)" e um desconto de "(\d*)" com valor mínimo "(\d*)", associado ao produto "([^\"]*)" com status "([^\"]*)"$/, 
        async (restName, name, discount, minValue, product, status) => {
            await addCoupon(name, discount, minValue, product, status);
        });
    Then(/^o cupom "([^\"]*)" é cadastrado$^/, async (couponName) => {
        var alertText = await browser.switchTo().alert().getText();
        expect(alertText).to.eventually.equal("Cupom cadastrado com sucesso!");   
    });
    Then(/^o cupom "([^\"]*)" é cadastrado$^/, async (couponName) => {
        expect(getCouponList().filter(async (coupon) => (await coupon == couponName))).to.eventually.equal(true);
    });
    
})
