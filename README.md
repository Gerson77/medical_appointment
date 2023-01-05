<!-- 
mkdir medical_appointment
npm init -y
npm i express
npm add typescript ts-node nodemon -D
npx tsc --init
npm i --save-dev @types/express
npm run dev 
-->

# Agendamento de consulta médica

### **Funcionalidades**

--- 

### **Cadastro de Usuário**

- Deve ser possível o usuário realizar um cadastro
    - [x] O usuário não precisa estar autenticado no sistema para se cadastrar.
    - [x] Não deve ser possível realizar o cadastro de um usuário sem username e senha.
    - [x] Não deve ser possível realizar um cadastro de username já existente.
    - [x] Não deve ser possível o usuário cadastrar a permissão de administrador.
    

---

## **Cadastro de especialidade**
- [ ] Deve ser possível um usuário cadastrar uma especialidade
    - [x] O usuário precisa estar autenticado na aplicação.
    - [x] Não deve ser possível realizar o cadastro de uma especialidade existente.
    - [x] O usuário precisa ter permissão de administrador.
    - [x] Não deve ser possível cadastrat uma especialidade com nome vázio

### **Cadastro de médico**
- [ ] Deve ser possível cadastrar um médico.
  - [x] O medíco deve possuir um CRM com 6 dígitos.
  - [x] O medíco deve estar atrelado a um usuário.
  - [ ] O medíco deve ter uma e somente uma especialidade.
  - [x] O medíco deve ser possível cadastrar um médico sem CRM.