/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Barrett Pyke',
      username: 'barrettpyke',
      password: 'johnsmith',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('barrettpyke');
      cy.get('#password').type('johnsmith');
      cy.get('#login-button').click();

      cy.contains('Barrett Pyke logged in');
    });
    it('fails with wrong password', function () {
      cy.get('#username').type('barrettpyke');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      cy.contains('Incorrect credentials.');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'barrettpyke',
        password: 'johnsmith',
      }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });
    it('A blog can be created', function () {
      cy.get('#create-expander').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Author Guy');
      cy.get('#website').type('www.google.com');
      cy.get('#create-button').click();

      cy.contains('Test Blog Author Guy', { timeout: 7000 });
    });
    it('and liked', function () {
      cy.get('#create-expander').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Author Guy');
      cy.get('#website').type('www.google.com');
      cy.get('#create-button').click();

      cy.contains('Like').click();
      cy.contains('1', { timeout: 6000 });
    });
    it('and deleted', function () {
      cy.get('#create-expander').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Author Guy');
      cy.get('#website').type('www.google.com');
      cy.get('#create-button').click();

      cy.contains('Delete').click();
      cy.contains('Are you sure you want to delete');
    });
  });
});
