Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarUsuario' , (token, usuario, email, password, administrador) =>{
    cy.request({
        method: 'POST', 
        url: 'usuarios',
        headers: {authorization: token}, 
        body: {
            "nome": usuario,
            "email": email,
            "password": password,
            "administrador": administrador
          }, 
          failOnStatusCode: false
    })
 })