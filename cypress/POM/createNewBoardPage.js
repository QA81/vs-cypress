class CreateNewBoardPage {
  get firstOrg() {
    return cy
      .get(".vs-c-my-organizations-item-wrapper")
      .eq(0)
      .find(".organization-list-item")
      .first();
  }

  get addNewBoard() {
    return cy.get(".vs-c-organization-boards__item--add-new");
  }

  get modalWindowHeader() {
    return cy.get(".vs-c-modal__header");
  }

  get boardTitleInput() {
    return cy.get("input").last();
  }

  get actionBtn() {
    return cy.get("button").last();
  }

  get radioCheck() {
    return cy.get(".vs-c-radio-check").first();
  }

  get boardTitle() {
    return cy.get(".vs-l-project__title");
  }

  createBoard(boardTitle) {
    this.firstOrg.click();
    cy.get("button").contains("OK").click();
    this.addNewBoard.click();
    this.boardTitleInput.type(boardTitle);
    this.actionBtn.click();
    this.radioCheck.click();
    this.actionBtn.click();
    this.actionBtn.click();
    this.actionBtn.click();
    this.actionBtn.click();
  }
}
export const createNewBoardPage = new CreateNewBoardPage();
