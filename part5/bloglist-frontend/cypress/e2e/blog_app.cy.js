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


});
