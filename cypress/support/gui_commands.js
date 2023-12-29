// Comando para Login
Cypress.Commands.add('login', (
  // Parâmetros opcionais com valores padrão das variáveis de ambiente do Cypress
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  // Opção para habilitar ou desabilitar o cache da sessão
  { cacheSession = true } = {},
) => {

  // Função interna para realizar o processo de login
  const login = () => {
    // Visita a página de login
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    // Clica no botão de login
    cy.get("[data-qa-selector='sign_in_button']").click()
  }
 
  // Função interna para validar se o login foi bem-sucedido
  const validate = () => {
    // Visita a página inicial após o login
    cy.visit('/')
    // Verifica a localização atual para garantir que não estamos na página de login
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  // Opções para o comando de sessão Cypress
  const options = {
    // Permite que o cache da sessão persista entre diferentes especificações
    cacheAcrossSpecs: true, 
    // Usa a função 'validate' para verificar se o login foi bem-sucedido
    validate, 
  }

  // Verifica se o cache da sessão está habilitado
  if (cacheSession) {
    // Se estiver habilitado, inicia uma sessão com o nome de usuário e a função de login
    cy.session(user, login, options)
  } else {
    // Se o cache da sessão estiver desabilitado, apenas executa o processo de login
    login()
  }
})


// Comando para Logout
Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})

// Comando para Criar Projeto
Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})