# Node.js Challenge - Artur Dolzan Neto

**Important**: Docker service required

### Commands to run after clone:

```
yarn
docker-compose up
yarn typeorm migration:run
yarn seed:admin
```

**Yarn seed** will insert the super user to database > email: admin@stocks.com password: Sl1322\*\* )

### Commands to run tests

```
yarn test
```

### Swagger Api Doc

_http://localhost:3333/api-docs/#/_

## What I Did

- **All minimum requirements**
- TDD architecture
- Typescript
- General error handling middleware
- Add unit tests for **some (but it's the same pattern to all)** the services
- Use JWT instead of basic authentication for endpoints
- Use containers to orchestrate the service
  - Database service (postgres)
  - API-Service: app-service container
  - Stock-Service: stock-service container
- Use OpenAPI/Swagger to document the API
- Add endpoint to reset user password sending an email with the new password

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
