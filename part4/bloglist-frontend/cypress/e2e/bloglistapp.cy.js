describe('Blog app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('username')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('blogs')
  })

})