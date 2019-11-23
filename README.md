# Schedule Manager da FOII

A aplicação que iremos dar continuidade é o desenvolvimento de um app gerenciador de consultas.
Nesse primeiro desafio vamos criar algumas funcionalidades básicas.

### Um pouco sobre as ferramentas

Você deverá criar a aplicação do zero utilizando o Express, além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL);

## Funcionalidades já existentes

Abaixo estão descritas as funcionalidades que temos até o momento

### Autenticação

Permite que um usuário administrador se autentique na aplicação utilizando e-mail e uma senha. E ao fazer login retorna um token que deve ser utilizado para realizar as ações nas chamadas às APÌs.
Existe um usuário administrador na sua base de dados, utilize esse usuário para todos logins daqui pra frente.

- A autenticação é feita utilizando JWT para validação dos dados de entrada;

### Cadastro de fornecedores

Permite que fornecedores sejam mantidos (cadastrados/atualizados/deletados) pelos administradores na aplicação utilizando os campos:

- supplier_id (gerado no backend),
- nome (informado pelo front)
- email (informado pelo front)
- endereco (informado pelo front)
- preco_hora (informado pelo front)
- capacidade (informado pelo front)
- created_at (gerado no backend),
- updated_at (gerado no backend),

  Nova tabela no banco de dados chamada de fornecedores.

  O cadastro de fornecedores só pode ser feito por administradores autenticados na aplicação.
  O fornecedor não pode se autenticar no sistema, ou seja, não possui senha.

### Agendamento de consultas (Schedule)

Campos da tabela agendamento:

- agendamento_id (gerado no backend),
- user_id (gerado no backend),
- supplier_id (gerado no backend),
- preco_final (calculado no backend)
- start_date (informado pelo front)
- end_date (informado pelo front)
- created_at (gerado no backend),
- updated_at (gerado no backend)

1. O administrador pode agendar/atualizar/deletar um período composto de dois horários para agendar a consulta com determinado fornecedor:

- start_date (data de inicio)
- end_date (data de termino)

2. O preço final é calculado baseado no preço (preco_hora) estipulado na tabela fornecedores multiplicado pela quantidade de horas do período escolhido na tabela agendamento. Os campos a seguir, não podem ser alterados pelo front_end.

- updated_at
- created_at
- agendamento_id
- user_id
- supplier_id

## Como executar?

1. Clone este repositório
2. Execute `yarn` ou `npm install` para baixar as dependências
3. Certifique-se de executar/rodar (run) o docker com o banco Postgres
4. Certifique-se do arquivo .env para as configurações do banco de dados
5. Execute as migrations e o seed do usuário principal

```
  yarn sequelize db:migrate
  yarn sequelize db:seed:all
```

6. execute `yarn dev` para iniciar o servidor
7. Certifique-se de rodar o docker-compose após ter configurado os passos anteriores
8. Teste os endpoints disponíveis... Você pode consultar na configuração do insomnia no arquivo
   [(aqui)](./Insomnia_configuration.json) ou no [(link do postman)](https://documenter.getpostman.com/view/9571652/SW7c27Vj)

9. Documentação da API: [(aqui)](https://documenter.getpostman.com/view/9571652/SW7c27Vj?version=latest)

10. Para conseguir executar as ações na tabela Schedule é preciso estar autenticado como administador. Para isso é preciso executar o login com os dados do administrador e utilizar o token devolvido na resposta. Utilize o mesmo token para fazer as requisições na tabela Schedule.

## Tarefas a serem implementadas no Back-End:

1. Permitir que clientes e fornecedores também se cadastrem e façam login no sistema. Para isso defina e explique as alterações feitas para controlar cada tipo de acesso.

2. Criar tabela ``Conditions`` onde o ``cliente`` poderá criar/alterar/deletar os seus problemas e condições médicas. Possuindo os seguintes campos:
   - id
   - user_id
   - condition

3. ``Fornecedores`` também poderão se cadastrar/editar/deletar seu registro na tabela fornecedores(Suppliers) com token válido.

4. ``Clientes`` também poderão agendar/cancelar horários na tabela consultas(Schedules) com token válido.


## Tarefas a serem implementadas no Front-End:

1. Criar tela de login e cadastro utilizando o back-end dado.
2. No fluxo de telas, o usuário deverá escolher se é cliente ou fornecedor antecipadamente ao cadastro.
3. Após escolher se é cliente ou fornecedor, poderá incluir o seu email, senha.
