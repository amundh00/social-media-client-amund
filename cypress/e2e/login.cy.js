// login.cy.js

//goes to local host/sass server to find the project
beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });
  
  describe("Login Flow", () => {
    
    const validEmail = "testamund@stud.noroff.no";
    const validPassword = "Testamund00";
    const invalidEmail = "trump2024@stud.noroff.no";
    const invalidPassword = "trump2024";
  
    it("should allow the user to log in with valid credentials", () => {
      cy.wait(2000); 
    // opens the login form
      cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
        .first()
        .click();
  
      cy.wait(1000); 
    //gets the valid login information to send to the form
      cy.get("#loginEmail").type(validEmail);
      cy.get("#loginPassword").type(validPassword);
  
      cy.wait(500); 
    //locates and presses the submit button
      cy.get('#loginForm button[type="submit"]').click();
  
      cy.wait(2000); 
    //check for local storage and authenticated data
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        const profile = win.localStorage.getItem("profile");
        expect(token).to.exist; 
        expect(profile).to.exist; 
      });
    //check for a logout button that should be visible
      cy.get('button[data-auth="logout"]').should("be.visible");
    });
    //test to check for error if a user that is not authenticated/registered tries to log in
    it("should not allow the user to submit the login form with invalid credentials and show an alert message", () => {
      cy.wait(2000);
    //finds login form
      cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
        .first()
        .click();
  
      cy.wait(1000); 
    //populates the login form with invalid data
      cy.get("#loginEmail").type(invalidEmail);
      cy.get("#loginPassword").type(invalidPassword);
  
      cy.wait(500); 
  
      // Listen for the alert and validate its message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Invalid email or password');
      });
  
      // presses submit to submit the login
      cy.get('#loginForm button[type="submit"]').click();
  
      // check to se that nothing is stored in local storage
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        const profile = win.localStorage.getItem("profile");
        expect(token).to.be.null; 
        expect(profile).to.be.null; 
      });
    });
  });
  