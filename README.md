# Schedule Manager da FOII

A aplicação que iremos dar início ao desenvolvimento é um app gerenciador de consultas.
Nesse primeiro desafio vamos criar algumas funcionalidades básicas.

### Um pouco sobre as ferramentas
Você deverá criar a aplicação do zero utilizando o Express, além de precisar configurar as seguintes ferramentas:
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL);

## Funcionalidades
Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

### Autenticação
Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.
Crie um usuário administrador utilizando a funcionalidade de seeds do sequelize, essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.
Para criar um seed utilize o comando:
```
yarn sequelize seed:generate --name admin-user
```
No arquivo gerado na pasta src/database/seeds adicione o código referente à criação de um usuário administrador:
```javascript
const bcrypt = require("bcryptjs");
module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [{
        name: "Administrador",
        email: "admin@admin.com",
        password_hash: bcrypt.hashSync("123456", 8),
        created_at: new Date(),
        updated_at: new Date()
      }],
      {}
    );
  },
  down: () => {}
};
```
Agora execute:
```
yarn sequelize db:seed:all
```
Agora você tem um usuário na sua base de dados, utilize esse usuário para todos logins daqui pra frente.
- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

### Cadastro de fornecedores
Permita que fornecedores sejam mantidos (cadastrados/atualizados/deletados) pelos administradores na aplicação utilizando os campos:
* supplier_id (gerado no backend),
* nome (informado pelo front)
* email (informado pelo front)
* endereco (informado pelo front)
* preco_hora (informado pelo front)
* capacidade (informado pelo front)
* created_at (gerado no backend),
* updated_at (gerado no backend)
Utilize uma nova tabela no banco de dados chamada de fornecedores.
O cadastro de fornecedores só pode ser feito por administradores autenticados na aplicação.
O fornecedor não pode se autenticar no sistema, ou seja, não possui senha.

### Agendamento de consultas
Campos da tabela agendamento:
* agendamento_id (gerado no backend),
* user_id (gerado no backend),
* supplier_id (gerado no backend),
* preco_final (calculado no backend)
* start_date (informado pelo front)
* end_date (informado pelo front)
* created_at (gerado no backend),
* updated_at (gerado no backend)

1. O administrador pode agendar/atualizar/deletar um período composto de dois horários para agendar a consulta com determinado fornecedor:
* start_date (data de inicio) 
* end_date (data de termino)

2. O preço final é calculado baseado no preço (preco_hora) estipulado na tabela fornecedores multiplicado pela quantidade de horas do período escolhido na tabela agendamento. Os campos a seguir, não podem ser alterados pelo front_end.
* updated_at
* created_at
* agendamento_id
* user_id
* supplier_id
