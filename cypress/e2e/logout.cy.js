// logout.cy.js

//goes to localserver/sass server to find project
beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });
  
  describe("Logout Flow", () => {
    
    const validEmail = "testamund@stud.noroff.no";
    const validPassword = "Testamund00";
    //test to se if a loged in user can logout and deletes authentication from local storage
    it("should allow the user to log out using the logout button", () => {
      cy.wait(2000); 
      //finds login form and logs in with valid credentials
      cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
        .first()
        .click();
      cy.wait(1000); 
      cy.get("#loginEmail").type(validEmail);
      cy.get("#loginPassword").type(validPassword);
      cy.wait(500); 
      cy.get('#loginForm button[type="submit"]').click();
    
      //finds logout button that should be visible
      cy.get('button[data-auth="logout"]').should("be.visible");
  
      cy.get('button[data-auth="logout"]').click();
      cy.wait(2000); 
    
    //local storage is cleared when the logout button is pressed
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        const profile = win.localStorage.getItem("profile");
        expect(token).to.be.null; 
        expect(profile).to.be.null;
      });
  
      cy.get('button[data-auth="login"]').should("be.visible");
    });
  });
  