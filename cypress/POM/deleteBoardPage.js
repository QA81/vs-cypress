class DeleteBoardPage {
  get firstBoard() {
    return cy.get(".vs-c-boards-item__active-sprints");
  }

  get configBoardBtn() {
    return cy.get(".vs-c-list").find("li").last();
  }

  get configSectionBtn() {
    return cy.get(".vs-c-settings-section-form").find(".vs-c-btn").last();
  }

  get deleteBtn() {
    return cy.get("button").last();
  }

  get confirmPasswordInput() {
    return cy.get(".vs-c-modal").find("input");
  }

  get yesBtn() {
    return cy.get(".vs-c-modal").find("button").last();
  }
}

export const deleteBoardPage = new DeleteBoardPage();
