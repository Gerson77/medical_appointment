
# Agendamento de consulta médica

### **Funcionalidades**

--- 

### **Cadastro de Usuário**

- Deve ser possível o usuário realizar um cadastro.
    - [x] O usuário não precisa estar autenticado no sistema para se cadastrar.
    - [x] Não deve ser possível realizar o cadastro de um usuário sem username e senha.
    - [x] Não deve ser possível realizar um cadastro de username já existente.
    - [x] Não deve ser possível o usuário cadastrar a permissão de administrador.
    

---

## **Cadastro de especialidade**
- [ ] Deve ser possível um usuário cadastrar uma especialidade.
    - [x] O usuário precisa estar autenticado na aplicação.
    - [x] Não deve ser possível realizar o cadastro de uma especialidade existente.
    - [x] O usuário precisa ter permissão de administrador.
    - [x] Não deve ser possível cadastrat uma especialidade com nome vázio.

### **Cadastro de médico**
- [ ] Deve ser possível cadastrar um médico.
  - [x] O medíco deve possuir um CRM com 6 dígitos.
  - [x] O medíco deve estar atrelado a um usuário.
  - [x] O medíco deve ter uma e somente uma especialidade.
  - [x] O medíco deve ser possível cadastrar um médico sem CRM.

---

## **Cadastro de Informação do médico**

- [x] Deve ser possível cadastrar a informação de um médico.
  - [x] O médico precisa estar cadastrado.
  - [x] O médico deve estar autenticado na aplicação.
  - [x] Não deve ser possível ter mais de um registro de informação por médico.
  - [x] O horário de termino não deve ser menor que o horário de ínico de atendimento.
  - [x] A duração da consulta não pode ser menor ou igual a zero.

--- 

### **Cadastro de agendamento**
- [ ] Deve ser possível cadastrar um agendamento
  - [ ] O paciente precisa estar cadastrado no sistema
  - [ ] O paciente deve estar autenticado na aplicação
  - [ ] O médico selecionado deve estar cadastrado no sistema
  - [ ] O médico escolhido deve ter disponibilidade para o hoŕario selecionado
  - [ ] O médico deve ter disponibilidade para o dia da semana escolhido
    - [ ] O horároi escolhido deve estar entre o horário de atendimento do médico
    - [ ] Não deve ser possível cadastrar um agendamento se já existir outro agendamento para o mesmo médico e horário selecionado