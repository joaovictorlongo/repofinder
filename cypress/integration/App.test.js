describe('App test', () => {
  it('Test application', () => {
    cy.visit('http://localhost:4200');
    cy.get('.no-data')
    cy.get('.search').type('angular')
    cy.get('form').submit()
    cy.get('.data')
    cy.get('pagination-controls')
    cy.get('.pagination-next > a').click()
    cy.get('.data')
    cy.get('.search').clear()
    cy.get('form').submit()
    cy.get('.mat-snack-bar-container')
    cy.get('.search').type('7k7k7k7k7k7k7k7k7k7k7k7k7k7k')
    cy.get('form').submit()
    cy.get('.no-data')
  });
});