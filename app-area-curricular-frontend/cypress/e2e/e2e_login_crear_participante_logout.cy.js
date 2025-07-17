describe('Flujo completo de usuario', () => {
  it('debe loguearse, crear un participante y cerrar sesión', () => {
    // Login
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('[data-cy="login-username"]').type('admin');
    cy.get('[data-cy="login-password"]').type('admin123');
    cy.get('[data-cy="login-submit"]').click();
    cy.contains('Inicio de sesión exitoso').should('be.visible');
    cy.window().its('localStorage.token').should('exist');
    

    // Crear participante
    const participantes = [
      // Estudiante
      { name: 'Estudiante A', role: 'Estudiante', type: 'invitado', state: 'activo' },
      { name: 'Estudiante B', role: 'Estudiante', type: 'invitado', state: 'inactivo' },
      { name: 'Estudiante C', role: 'Estudiante', type: 'asistente', state: 'activo' },
      { name: 'Estudiante D', role: 'Estudiante', type: 'asistente', state: 'inactivo' },
      { name: 'Estudiante E', role: 'Estudiante', type: 'ausente', state: 'activo' },
      { name: 'Estudiante F', role: 'Estudiante', type: 'ausente', state: 'inactivo' },

      // Profesor
      { name: 'Profesor A', role: 'Profesor', type: 'invitado', state: 'activo' },
      { name: 'Profesor B', role: 'Profesor', type: 'invitado', state: 'inactivo' },
      { name: 'Profesor C', role: 'Profesor', type: 'asistente', state: 'activo' },
      { name: 'Profesor D', role: 'Profesor', type: 'asistente', state: 'inactivo' },
      { name: 'Profesor E', role: 'Profesor', type: 'ausente', state: 'activo' },
      { name: 'Profesor F', role: 'Profesor', type: 'ausente', state: 'inactivo' },
    ]
    // Ir al menu de participantes
    cy.contains('Inicio de sesión exitoso').should('be.visible');
    cy.get('.swal2-confirm').click();

    cy.get('button[aria-label="menu"]').click();

    // --- Hacer click en "Participantes del comité"
    cy.contains('span', 'Participantes del comité').click();
    cy.get('body').click('topRight');
    // Crear cada participante
    participantes.forEach(p => {
      cy.contains('Nuevo Participante').click();
      cy.get('input[name="name"]').clear().type(p.name);
      cy.get('select[name="role"]').select(p.role);
      cy.get('select[name="type"]').select(p.type);
      cy.get('select[name="state"]').select(p.state);
      cy.contains('Crear').click();

      // Espera y valida el Swal de éxito
      cy.contains('Participante creado exitosamente').should('be.visible');
      cy.get('.swal2-confirm').click();
      cy.wait(250);
    });

    // Logout
    // Abre el menú de usuario
    cy.get('button[aria-label="account of current user"]').click();

    // Haz click en el item 'Logout'
    cy.get('li[role="menuitem"]').contains('Logout').click();

    cy.window().its('localStorage.token').should('not.exist');

    cy.contains('Login');

  });
});
