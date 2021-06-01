<img alt="GoStack" src=".github/rocketseat.png" />

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
</p>

<br>


## Ignite Node.js - Rentx

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/) - 0.63.3
- [Yarn](https://yarnpkg.com/) - 1.22.4
- [Npm](https://www.npmjs.com/) - 6.14.5
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Docker](https://www.docker.com/) - 19.03.8

## 💻 Projeto

API para locação de carros.

### Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo carro.

**RN**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros
**RF**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo - nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo - nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo - nome do carro.
**RN**

- O usuário não precisar estar logado no sistema.

### Cadastro de Especificação no carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro

**RN**

- Não deve ser possível cadastrar uma especificação para um - carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já - existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

### Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar a imagem do carro.

**RN**F

- Utilizar o multer para upload dos arquivos.

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o - mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

### Alugel de carro

**RF**

- Deve ser possível cadastrar um aluguel.

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser - alterado para indisponível.

### Devolução de carro

**RF**

- Deve ser possível realizar a devolução de um carro.

**RN**

- Se o carro for devolvido com menos de 24 horas, deverá - ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para - outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado - para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do - aluguel.
- Caso o horário de devolução seja superior ao horário - previsto de entrega, deverá ser cobrado multa - proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

### Listagem de Alugueis para usuário

**RF**

- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**

- O usuário deve estar logado na aplicação.

### Recuperar Senha

**RF**

- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**

- O usuário precisa informar uma nova senha.
- O link enviado para a recuperação deve expirar em 3 horas.

Teste:

<p align="center">
  <img alt="resolucao" src=".github/teste.PNG" width="100%">
</p>

## 🚀 Como Rodar

- Clone o projeto.
- Entre na pasta do projeto e rode "yarn install" (pode usar npm install de acordo com a sua configuração).
- "yarn test" para rodar os testes.
- yarn run dev para rodar o projeto (localhost:3333).

## 👩🏿‍💻 Rotas

- **`POST /users`**: Rota para cadastro de usuarios.

Enviar:
```
{
    "name": "João",
    "username": "joao"
}
```
Retorna:
```
{
    "id": "bc57f695-ae37-48cf-9401-d8aa1f4fd914",
    "name": "João",
    "username": "joao",
    "todos": []
}
```
- **`POST /todos`**: Rota para cadastrar tarefas dos ususarios.

Enviar headers:
```
{
    "username": "joao"
}
```

Enviar:
```
{
    "title": "Sei la",
    "deadline": "2021-03-31"
}
```

Retorna:
```
{
    "id": "12c44b61-61f8-4ab8-9365-49f107f1796f",
    "title": "Sei la",
    "deadline": "2021-03-31T00:00:00.000Z",
    "done": false,
    "created_at": "2021-04-01T01:50:51.046Z"
}
```
- **`GET /todos`**: Rota para buscar todas as tarefas de um usuario.

Enviar headers:
```
{
    "username": "joao"
}
```

Retorna:
```
[
    {
        "id": "12c44b61-61f8-4ab8-9365-49f107f1796f",
        "title": "Sei la",
        "deadline": "2021-03-31T00:00:00.000Z",
        "done": false,
        "created_at": "2021-04-01T01:50:51.046Z"
    },
    {
        "id": "47d9dbfa-5095-4465-85c6-9cb513c9c720",
        "title": "Sei la 2",
        "deadline": "2021-03-31T00:00:00.000Z",
        "done": false,
        "created_at": "2021-04-01T01:51:34.911Z"
    },
    {
        "id": "db9f09c6-d788-492c-ab23-59ed99ef1340",
        "title": "Sei la 3",
        "deadline": "2021-03-31T00:00:00.000Z",
        "done": false,
        "created_at": "2021-04-01T01:51:38.452Z"
    }
]
```

- **`PUT /todos/:id`**: Rota para alterar uma tarefa de um ususario.

Enviar headers:
```
{
    "username": "joao"
}
```

Enviar:
```
{
    "title": "Sei la alterado",
    "deadline": "2021-04-02"
}
```

Retorna:
```
{
    "id": "12c44b61-61f8-4ab8-9365-49f107f1796f",
    "title": "Sei la alterado",
    "deadline": "2021-04-02",
    "done": false,
    "created_at": "2021-04-01T01:50:51.046Z"
}
```

- **`PATCH /todos/:id/done`**: Rota para alterar o campo done de uma tarefa de um ususario.

Enviar headers:
```
{
    "username": "joao"
}
```

Retorna:
```
{
    "id": "12c44b61-61f8-4ab8-9365-49f107f1796f",
    "title": "Sei la alterado",
    "deadline": "2021-04-02",
    "done": true,
    "created_at": "2021-04-01T01:50:51.046Z"
}
```

- **`DELETE /todos/:id`**: Rota para deletar uma tarefa de um ususario.

Enviar headers:
```
{
    "username": "joao"
}
```

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT.
