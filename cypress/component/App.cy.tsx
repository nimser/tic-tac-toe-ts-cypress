import App from "../../src/App"

beforeEach(() => {
  cy.mount(<App />)
})
describe("App.cy.tsx", () => {
  it("should load the grid", () => {
    cy.getByData("cell-0-0").should("exist")
    cy.getByData("cell-2-2").should("exist")
  })

  it("should add a X when first user clicks on the grid", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
  })

  it("should add a O when second user clicks on the grid", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("O")
  })
  xit("should prevent ticking a previously ticked cell", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("0")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("0")
  })

  xit("should say player 1 wins", () => {})
  xit("should say player 2 wins", () => {})
  xit("should prevent playing after player won", () => {})
})
