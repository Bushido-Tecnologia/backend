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

- [x] Endpoint pra newsletter
- Titulo
- Conteudo do e-mail
- Usar template de e-mail no back
- [ ] Criar template para o e-mail
- [x] Poder se inscrever na newsletter
- [x] Guardar os cadastros no back
- [x] Cadastro de novos voluntários
- [x] Endpoint para se voluntariar
- Pegar as informações do voluntário (nome, sobrenome, e-mail, telefone, assunto, menssagem)
- [ ] Enviar um e-mail para ele

- [ ] Sistema de administração
  - Precisa ter a permissão de administrador
  - Newsletter
  - [x] Criar autenticação para admin
  - [ ] Poder enviar um novo e-mail
  - [x] Endpoint pra listar quem está cadastrado na newsletter
  - [x] Endpoint pra deletar uma inscrição na newsletter
  - Cadastro de novos voluntários
  - [x] Listar voluntários
  - [x] Deletar ou atualizar informações do voluntariado

#### Serviços de Email

- [ ] Brevo: máximo de 300 emails por dia. Necessário criar conta para chave da API. -[ ] Sendgrid: máximo de 100 emails por dia. Necessário criar conta para chave da API.

#### TO-DO's

- Testar mais
- Melhorar as validações que está em utils/validations
- Lidar e melhorar as mensagens de erro
- Implementar o **mailService**
