describe('/reaction/emoji', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/challenge/PVfdzOEWAOICwngJZJhX');
  });

  it('add emoji from emoji list', () => {
    cy.get('.emoji-list-1 .count')
      .invoke('text')
      .then((value) => {
        const preValue = Number(value);
        cy.get('.emoji-list-1').click();
        cy.get('.emoji-list-1 .count')
          .invoke('text')
          .should('eq', String(preValue + 1));
      });
  });

  it('cancel reacted emoji from emoji list', () => {
    cy.get('.emoji-list-1 .count')
      .invoke('text')
      .then((value) => {
        const preValue = Number(value);
        cy.get('.emoji-list-1').click();
        cy.get('.emoji-list-1 .count')
          .invoke('text')
          .should('eq', String(preValue - 1));
      });
  });
});
