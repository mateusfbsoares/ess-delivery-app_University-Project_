import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameNumber = ((elem, number) => elem.element(by.name('numberlist')).getText().then(text => text === number));
let sameName = ((elem, name) => elem.element(by.name('namelist')).getText().then(text => text === name));
let sameType = ((elem, type) => elem.element(by.name('typelist')).getText().then(text => text === type));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then}) {
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Inserção');
        //await $("a[name='metodos']").click();
    });

    Given(/^ele já possui cinco métodos de pagamento cadastrados$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        await expect(Promise.resolve(allnames.length)).to.eventually.equal(5);
    });

    When(/^ele insere um método de pagamento$/, async () => {
        await element(by.buttonText('Inserir')).click();
    });

    Then(/^uma mensagem informando limite de métodos de pagamento aparece na tela$/, async () => {
        var allelementos : ElementArrayFinder = element.all();
        allelementos.filter(elem => sameName(elem,'limite')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})