describe('/challenge', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/challenge');
  });
  it('버튼 잘 나올까', () => {
    cy.get('a[role="button"]').invoke('text').should('eq', '챌린저 모집');
  });
});
