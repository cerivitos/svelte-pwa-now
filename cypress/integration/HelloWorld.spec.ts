describe("When button clicked", function() {
  it("count increments", function() {
    cy.visit("/");
    cy.get(".button")
      .click()
      .contains("1");
  });
});
