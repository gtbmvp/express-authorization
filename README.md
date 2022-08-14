# express-authorization

JWT (**jsonwebtoken** package) vs Sessions (**express-session** package) Authorization.

**Routes:**

- Registration route (POST):
  - username not empty and password length validations (_express-validator_);
  - _bcypt_ passwords before storing;
- Login route (POST):
  - JWT: with success authentication generate token with user `id` and his `roles` and send to client;
  - SESSION: with success authentication add `authorized` and `roles` fields to `req.session` object;
- Get user list route (GET):
  - two middlewares on choice: all successfully authenticated can proceed or only ones with specific role.

**Middlewares:**

- `AuthMiddleware`:

  - JWT: client without token in _Authorization_ header or with invalid token can't proceed;
  - SESSION: client without `req.session.authorized` can't proceed;

- `RoleMiddleware`:
  - JWT: if clients token has \<ROLE> (passed as argument) - he can proceed;
  - SESSION: if clients `req.session.roles` array has \<ROLE> (passed as argument) - he can proceed.
