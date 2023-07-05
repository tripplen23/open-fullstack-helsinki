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

  // 5.17
  it('Login form is shown', function () {
    cy.get('.loginForm').should('exist');
  });

  // 5.18
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Binh', password: '123123' });
    });

    // 5.19
    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('cypress is the best!');
      cy.get('#author').type('Binh Nguyen');
      cy.get('#url').type('www.cypress.com');
      cy.get('#create-blog-btn').click();

      cy.contains('cypress is the best!');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress 1',
          author: 'Ben',
          url: 'www.cypress.com',
        });
        cy.createBlog({
          title: 'another blog cypress 2',
          author: 'Ben',
          url: 'www.cypress.com',
        });
        cy.createBlog({
          title: 'another blog cypress 3',
          author: 'Ben',
          url: 'www.cypress.com',
        });
      });

      // 5.20
      it(' users can like a blog', function () {
        cy.contains('another blog cypress 2').parent().find('button').click();
        cy.get('#like-btn').click();
      });

      // 5.21
      it(' user can delete a blog', function () {
        cy.contains('another blog cypress 3').parent().find('button').click();
        cy.get('#like-btn').click();
        cy.get('#delete-btn').click();

        cy.get('.success')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });
    });
  });
});
