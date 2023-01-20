# Cypress Gitlabs

> Curso intermediario da <a href="https://github.com/wlsf82" targe="blank">Escola Talking Abount Testing</a> de Cypress


# Conteúdo

---
Durante o curso de testes automatizados com o Cypress foi aprendido
 * Como configurar o ambiente local de desenvolvimento
 * Como instalar e configurar o Cypress
 * Como criar testes automatizados de interface gráfica de usuário
 * Como criar testes automatizados de API (com feedback visual no navegador)
 * Como testar APIs que necessitam um token de acesso
 * Como criar testes otimizados e direto-ao-ponto
 * Como salvar a sessão do usuário no navegador para posterior restauração
 * Como validar se a sessão do usuário ainda é válida e como lidar com isso quando a mesma é invalidada
 * Como fazer a limpeza e criação da massa de dados antes do teste começar
 * Como proteger dados sensíveis, tais como senhas e tokens de acesso
 * Como organizar os testes e comandos customizados em diferentes "camadas" (API, CLI, GUI)
 * Como estruturar os testes pensando em pré-condições, ações e resultados esperados
 * Como gerar dados aleatórios para uso nos testes automatizados
 * Como habilitar funcionalidades experimentais do Cypress
 * Como executar comandos à nível de sistema operacional
 * E como testar a leitura de arquivos

## Pré-requisitos

Antes de começar, garanta que os seguintes requisitos sejam atendidos:

* Computador com no mínimo 2 cores
* e no mínimo 8 GB de memória RAM

Além disso, garanta que os seguintes sistemas estejam instalados no seu computador:

* <a href="https://www.docker.com/" target="blank">Docker</a> (estou usando a versão 20.10.22)
* <a href="https://git-scm.com/" target="blank">git</a> (estou usando a versão 2.39.0)
* <a href="https://nodejs.org/en/" target="blank">Node.js</a> (estou usando a versão v16.18.0)
* <a href="https://www.npmjs.com/" target="blank">npm</a> (estou usando a versão 9.3.0)
* <a href="https://code.visualstudio.com/" target="blank">Visual Studio Code</a> (versão 1.74.3) ou alguma outra IDE de sua preferência
* <a href="https://www.jetbrains.com/webstorm/promo/?source=google&medium=cpc&campaign=9641686251&term=webstorm&content=523833970787" target="blank">WebStorm</a> (versão 17.0.5) No meu caso estou usando essa IDE

> Para verificar as versões do Docker, git, Node.js e npm como o seguinte comando `docker --version && git --version && node --version && npm --version`


# Funcionalidades da aplicação de testes

O GitLab possui diversas funcionalidades, porém, duruante o curso fui tratado as seguintes:

* Login
* Logout
* Criação de projeto
* Criação de issue
* Adição de uma etiqueta (label) à uma issue
* Adição de um marco (milestone) a uma issue
* Git clone

# Setup do ambiente local com Docker

Com o docker rodando no seu computador, execute o comando 

```bash
docker run --publish 80:80 --publish 22:22 --hostname localhost wlsf82/gitlab-ce
```
e aguarde até o ambiente inicializar.

> 🕐 Isso por levar alguns minutos.
>
> ☕ Portanto, recomendo pegar um café (ou um chá) enquanto aguarda.

Depois de alguns minutos, acesse a URL <a href="http://localhost" target="blank">http://localhost</a> para definir a senha do usuário `root`.

## Definindo a senha do usuário root

Ao acessar a URL <a href="http://localhost" target="blank">http://localhost</a>, deverá aparece ma página assim, no qual deve ser traocado a senha do usuário `root`

<img width="1134" alt="please-create-a-password-for-your-new-account" src="https://user-images.githubusercontent.com/68359459/213010797-da839415-d576-4c6e-9f84-b289b737d957.png">


## Criando um Access Token

1. Faça login com o usuário `root` com a senha definida na seção anterior
2. Clique no avatar do usuário no canto superior direito da tela; clique no link _Settings_, e então; clique na opção _Access Tokens_ (no menu lateral esquerdo)
3. No campo nome, digite o valor `cypress-intermediario-v2`; na seção _Scopes_ marque a opção **api**; e então, clique no botão _Create personal access token_.

> Uma mensagem de que o _token_ foi criado com sucesso deve ser exibida, além do _token_ propriamente dito. **Copie o _token_**.

## Adicionando uma chave SSH
1. No terminal de linha de comando, digite o seguinte comando e pressione ENTER `ssh-keygen -t ed25519 -C "root@example.com"`
2. Será solicitado um caminho para salvar a chave. Pressione `ENTER` para aceitar o caminho padrão
3. Será solicitada uma senha. Pressione `ENTER` para que a senha não seja necessária
4. Será solicitado que repita a senha. Pressione `ENTER` novamente para que a senha não seja necessária
5. De novo no terminal de linha de comando, digite o seguinte comando e pressione `ENTER` para copiar a chave pública recém-criada para a área de transferência `clip < ~/.ssh/id_ed25519.pub` (no caso de windows)
6. Logado na aplicação com o usuário root, clique no avatar do usuário no canto superior direito da tela; clique no link Settings; e então, clique na opção SSH Keys (no menu lateral esquerdo)
7. Cole sua chave SSH pública no campo key. O campo Title deve ser automaticamente preenchido
8. Por fim, clique no botão `Add key`.

----

# Setup do projeto de testes com Cypress

## Clonando o projeto

1. Acesse a URL <a href="https://github.com/wlsf82/cypress-intermediario-v2" target="blank">https://github.com/wlsf82/cypress-intermediario-v2</a>
2. Clique no botão Clone
3. Escolha uma das opções (Clone with SSH ou Clone with HTTPS) e então clique no botão Copy URL ao lado do campo da opção escolhida

## Instalando o Cypress e outras libs

----
No terminal de linha de comando, na raiz do projeto, execute o comando (este comando irá instalar o Cypress e outras libs como dependências de desenvolvimento, além de criar o arquivo` package-lock.json` e o diretório `node_modules/`, para onde é feito o download de todas as dependências).

```bash
npm i @faker-js/faker@7.6.0 cypress@12.0.2 cypress-plugin-api@2.6.1 -D
```

## Inicializando o Cypress

----

No terminal de linha de comando, na raiz do projeto, execute o comando (este comando irá abrir a Cypress App, a qual vai guiar na criação do projeto de testes end-to-end (E2E).

```bash
npx cypress open
```

1. Clique no botão para a criação de um projeto de testes end-to-end (E2E Testing);
2. Aceite os arquivos de configuração clicando no botão Continue;
3. Selecione o navegador `Electron` e clique no botão `Start E2E Testing in Electron`;
4. Crie um primeiro arquivo de teste clicando na opção `Create new emtpy spec`;
5. Nomeie o arquivo como `login.cy.js`; 
6. clique no botão Create spec;
7. e então, confirme clicando no botão `Ok`, `run the spec`;
8. Após a execução do arquivo recém-criado, feche o navegador Electron.

## Configurando o projeto de testes automatizados

1. Feche a Cypress App
2. Abra o arquivo `cypress.config.js` criado na raiz do projeto e altere seu conteúdo pelo seguinte:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
  },
  fixturesFolder: false,
  video: false,
})
```

3. Ainda na raiz do projeto, crie um arquivo chamado `cypress.env.json` com os seguintes dados:

```json
{
    "user_name": "root",
    "user_password": "password-do-usuario-root-definido-anteriormente",
    "gitlab_access_token": "access-token-criado-anteriormente"
}
```

4. Na pasta `cypress/`, crie uma subpasta chamada `downloads/`.

# Testando a funcionalidade login

1. No diretório `cypress/e2e/`, crie um diretório chamado `gui/` (graphical user interface)
2. Então, mova o arquivo `login.cy.js` para o diretório recém-criado e modifique os seus dados para o seguinte:

```javascript
describe('Login', () => {
  it('successfully', () => {
    cy.login()

    cy.get('.qa-user-avatar').should('be.visible')
  })
})
```

3. Dentro do diretório `cypress/support/`, renomeie o arquivo `commands.js` por `gui_commands.js` e altere seu conteúdo pelo seguinte:

```javascript
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  login()
})
```

4. No diretório `cypress/support/`, altere os dados do arquivo e2e.js pelo seguinte:

```bash
import './gui_commands'
```

5. Por fim, no terminal de linha de comando, na raiz do projeto, execute o comando para executar o novo teste em modo headless.

```bash
npx cypress run --spec cypress/e2e/gui/login.cy.js
```

```
(Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  login.cy.js                              00:02        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:02        1        1        -        -        -

```

# Testando a funcionalidade de logout

Criar um teste automatizado que exercita a funcionalidade de logout via interface gráfica de usuário.

1. Dentro do diretrório `cypress/e2e/gui/`, crie um arquivo chamado `logout.cy.js` com os seguintes dados:

```javascript
describe('Logout', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('successfully', () => {
    cy.logout()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})
```

2. No diretório `cypress/support/`, atualize o arquivo `gui_commands.js` com o commando logout, conforme abaixo:

```javascript
Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()
})
```

3. Por fim, no terminal de linha de comando, na raiz do projeto, execute o comando para executar o novo teste em modo headless.

```bash
npx cypress run --spec cypress/e2e/gui/logout.cy.js
```

```
(Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  logout.cy.js                             00:03        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:03        1        1        -        -        -
```

# Testando a funcionalidade de criação de projeto

## Modo Intefarce Gráfica de Usuário

Criar um teste automatizado que exercita a funcionalidade de criação de projeto via interface gráfica de usuário.

1. Dentro do diretrório `cypress/e2e/gui/`, crie um arquivo chamado `createProject.cy.js` com os seguintes dados:

```javascript
import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.login()
  })

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.gui_createProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })
})
```

2. No diretório `cypress/support/`, atualize o arquivo gui_commands.js com o commando `gui_createProject`, conforme abaixo:

```javascript
Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})
```

3. Por fim, no terminal de linha de comando, na raiz do projeto, execute o comando para executar o novo teste em modo headless.

```bash
npx cypress run --spec cypress/e2e/gui/createProject.cy.js
```

```
(Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  createProject.cy.js                      00:06        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:06        1        1        -        -        -

```

## Salvando a sessão do usuário

Use a funcionalidade `cy.session()` para salvar a sessão do usuário no navegador, e assim, otimizar os testes, fazendo login via GUI somente para o teste que faz sentido.

1. No arquivo `cypress/support/gui_commands.js`, altere o comando customizado de login pelo seguinte:

```javascript
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const options = {
    cacheAcrossSpecs: true,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})
```

2. No arquivo `cypress/e2e/gui/login.cy.js`, altere seu conteúdo para o seguinte:

```javascript
describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})
```

3. Por fim, feche a Cypress App, abra-a de novo `npx cypress open` e execute os seguintes testes, nesta exata ordem: `createProject.cy.js`, (2x) e `logout.cy.js`.

## Validando a sessão

Se você executar novamente o teste `createProject.cy.js` após ter implementado o uso da funcionalidade `cy.session()`, perceberá que, se o teste de logout for executado antes, a sessão será perdida e teremos um erro.

Isso ocorre, pois, o teste de logout inválida a sessão.

1. Ainda via Cypress App, execute de novo o arquivo `createProject.cy.js`
2. No arquivo `cypress/support/gui_commands.js`, altere o comando customizado de `login` pelo seguinte:

```javascript
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})
```

3. Feche a **Cypress App** abra-a de novo com o comando `npx cypress open`; escolha a opção **E2E Testing** e inicialize o navegador **Electron**

4. Por fim, via Cypress App, execute de novo todos os testes, quantas vezes quiser, e na ordem que quiser. Todos eles devem passar em todas execuções, porém, dependendo da ordem, um pode se beneficiar da sessão criada pelo teste anterior.

# Testando criação de issue

Criar um teste automatizado que exercita a funcionalidade de criação de issue via interface gráfica de usuário.

1. Dentro do diretrório `cypress/e2e/gui/`, crie um arquivo chamado `createIssue.cy.js` com os seguintes dados:

```javascript
import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  beforeEach(() => {
    cy.login()
    cy.gui_createProject(issue.project)
  })

  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
```

2. No diretório `cypress/support/`, atualize o arquivo `gui_commands.js` com o commando `gui_createIssue`, conforme abaixo:

```javascript
Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})
```

3. Por fim, via Cypress App, execute o teste `createIssue.cy.js`.

# Testando criação de projeto via API

> testar o cenário de criação de projeto (via API) com sucesso.

##  Criação de projeto via API

1. Dentro do diretório `cypress/e2e/`, crie um novo diretório chamado `api/`

2. Dentro do diretrório `cypress/e2e/api/`, crie um arquivo chamado `createProject.cy.js` com os seguintes dados:

```javascript
import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.api_createProject(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)
            })
    })
})

```

3. Dentro do diretório `cypress/support/`, crie um arquivo chamado `api_commands.js`, com os seguintes dados:

```javascript
import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.api_createProject(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)
            })
    })
})

```

4. Dentro do diretório `cypress/support/`, adicione ao arquivo e2e.js o import do arquivo `api_commands.js`, conforme abaixo:

````javascript
import './api_commands'
import './gui_commands'
````

5. Por fim, via Cypress App, execute o teste `cypress/e2e/api/createProject.cy.js` via o comamdo `npx cypress open`.