Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
    cy.visit('');
  });
});

Cypress.Commands.add('createBlog', ({ content, important }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  });

  cy.visit('');
});
