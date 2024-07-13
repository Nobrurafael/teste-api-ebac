/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('fulano.teste@gmail.com', 'senha').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });//RESOLVIDO

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should(response => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
    
  });// RESOLVIDO

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      headers: {authorization: token},
      body: {
        "nome": "Bruno",
        "email": faker.internet.email(),
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.body.message).equal('Cadastro realizado com sucesso')
      expect(response.status).equal(201)
    })
  });//RESOLVIDO

  it('Deve validar um usuário com email inválido  POST', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "fulano.este@gmail.com",
          "password": "senha"
      },
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
    })
    
  });//Resolvido

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios' + '/xb9P4Tf0SgNRiPGS',
      body:   {
        "nome": "Bruno",
        "email": faker.internet.email(),
        "password": "teste",
        "administrador": "true",
      }
    }).should((response) => {
      expect(response.body.message).to.equal('Registro alterado com sucesso')
      expect(response.status).to.equal(200)
    })
  });//RESOLVIDO

  it.only('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/orrU6YGyMdqgb7OG',
    }).should((response) => {
      expect(response.body.message).to.equal('Registro excluído com sucesso')
      expect(response.status).to.equal(200)
    })
  });


});
