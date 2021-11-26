# Node.js - Artur Dolzan Neto

**Important**: Docker service required

### Commands to run after clone:

```
yarn
docker-compose up
yarn typeorm migration:run
yarn seed:admin
```

### Commands to run tests

```
yarn test
```

### Swagger Api Doc

_http://localhost:3333/api-docs/#/_

# Register

**Functional requirements**

- Should be able to register new users to database.

## Session

**Functional requirements**

- Should be able to authenticate the user and generate a token

## Stock

**Functional requirements**

- Should be able to consult the requested stock

## Stock History

**Functional requirements**

- Should be able to consult the access history by user

## Stock Stats

**Functional requirements**

- The Super User should be able to consult the total amount per stock

## Forgot Password

**Functional requirements**

- Should be able to request a password recovery. Should send a e-mail with a token to reset the current password
  Ps: If you do not receive the email, you can see the link on the console that will take you to the screen with the token. Example: api-service | Preview URL: *https://ethereal.email/message/YaDrlfYh9UxpF5TtYaDrxmjK3wi837DYAAAAAeAygE7bmzPGBK-pfCyBYlk*

## Reset Password

**Functional requirements**

- Should update the password with the token authorization given in step "Forgot Password"
