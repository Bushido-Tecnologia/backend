### Backend

Como rodar a aplicação

- Ter no mínimo o NodeJS v14.17
- Rodar os comandos:

```bash
  npm install
  npm run dev
```

#### Tecnologias

- Typescript
- Express
- MongoDB

#### Features

- [ ] Endpoint pra newsletter
- Titulo
- Conteudo do e-mail
- Usar template de e-mail no back
- [ ] Criar template para o e-mail
- [ ] Poder se inscrever na newsletter
- [ ] Guardar os cadastros no back
- [ ] Cadastro de novos vonluntários
- [ ] Endpoint para se vonluntariar
- Pegar as informações do voluntário (nome, sobrenome, e-mail, telefone, assunto, menssagem)
- [ ] Enviar um e-mail para ele

- [ ] Sistema de administração
  - Precisa ter a permissão de administrador
  - Newsletter
  - [ ] Criar autenticação para admin
  - [ ] Poder enviar um novo e-mail
  - [ ] Endpoint pra listar quem está cadastrado na newsletter
  - [ ] Endpoint pra deletar e atualizar uma inscrição na newsletter
  - Cadastro de novos vonluntários
  - [ ] Listar vonluntários
  - [ ] Deletar ou atualizar informações do vonluntariado

#### Serviços de Email

- [ ] Brevo: máximo de 300 emails por dia. Necessário criar conta para chave da API. -[ ] Sendgrid: máximo de 100 emails por dia. Necessário criar conta para chave da API.

```ts
interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
```
