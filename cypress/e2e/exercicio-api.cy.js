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

  it('Deve cadastrar usuário - POST', () => {
    let usuario = 'Usuario EBAC ' + Math.floor(Math.random() *10000000000000000)
    cy.cadastrarUsuario(token, usuario)
    cy.request({
      method: 'POST',
      url: 'usuarios',
      headers: {authorization: token},
      body: {
        "nome": usuario,
        "email": faker.internet.email(),
        "password": "senha",
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
    let usuario = 'Usuario EBAC ' + Math.floor(Math.random() *10000000000000000)
    cy.cadastrarUsuario(token, usuario)
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body:   {
          "nome": usuario,
          "email": faker.internet.email(),
          "password": "senha",
          "administrador": "true",
        }
      }).should((response) => {
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        expect(response.status).to.equal(201)
      })
    })
   
  });//RESOLVIDO

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    cy.cadastrarUsuario(token, 'usuario a ser deletado', 'Delete')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'Delete',
        url: `usuarios/${id}`,
        headers: {authorization: token}

      })
    })
  });

});