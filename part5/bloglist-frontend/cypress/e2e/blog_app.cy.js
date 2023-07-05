describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('');
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Duc Binh',
      username: 'Binh',
      password: '123123',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
  });

  // Test if connect successfully
  it('front page can be opened', function () {
    cy.contains('Blogs');
  });
  it('Login form is shown', function () {
    cy.get('.loginForm').should('exist');
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Binh');
      cy.get('#password').type('123123');
      cy.get('#login-btn').click();
      cy.contains('Duc Binh logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Binh');
      cy.get('#password').type('123456');
      cy.get('#login-btn').click();

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});
