# ts-express-auth

A simple and minimal implementation of OAuth 2.0 in Node.js.

## Run

```sh
yarn install
yarn start
```

## Endpoints

**Note:** Since the application has no actual logic and data, a hard-coded sample user is used. See [`user.ts`](./src/models/user.ts).

### POST `/auth/login`

Login and get an access and refresh token.

Sample request:

```json
{
  "username": "test",
  "password": "test-password"
}
```

Sample response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJmdWxsTmFtZSI6IlRlc3QgVXNlciIsInBhc3N3b3JkIjoidGVzdC1wYXNzd29yZCIsImlhdCI6MTYzMDE1OTQ1MCwiZXhwIjoxNjMwMTU5NDgwfQ.2Wfwyl6Cre9n43q62GY4adEp0nypBuJtcSMJK5e2g2o",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzAxNTk0NTAsImV4cCI6MTYzMDE1OTU3MH0.VJ-3IvwPt24lvMgUR61RR3lOJ5D8L83oJUVqJwLfB5c"
}
```

### POST `/auth/refresh`

Get a new access token from a refresh token. The body is empty and the refresh token is sent through the `Authorization` header. The response also returns a new rotated refresh token.

Sample request header:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzAxNTk0NTAsImV4cCI6MTYzMDE1OTU3MH0.VJ-3IvwPt24lvMgUR61RR3lOJ5D8L83oJUVqJwLfB5c"
}
```

Sample response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJmdWxsTmFtZSI6IlRlc3QgVXNlciIsInBhc3N3b3JkIjoidGVzdC1wYXNzd29yZCIsImlhdCI6MTYzMDE1OTcyNiwiZXhwIjoxNjMwMTU5NzU2fQ.FxhppsfpTSEYiaM3tb9fUNMaHxFl7v8dNbcoJc0P-KI",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzAxNTk3MjYsImV4cCI6MTYzMDE1OTg0Nn0.UDtnnFxKZKo1v8iI_k-5EuohK6SwwilSQakQpzYimvo"
}
```

### GET `/user/profile`

A test endpoint with authentication for getting the user information.

Sample request header:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJmdWxsTmFtZSI6IlRlc3QgVXNlciIsInBhc3N3b3JkIjoidGVzdC1wYXNzd29yZCIsImlhdCI6MTYzMDE1OTcyNiwiZXhwIjoxNjMwMTU5NzU2fQ.FxhppsfpTSEYiaM3tb9fUNMaHxFl7v8dNbcoJc0P-KI"
}
```

Sample response:

```json
{
  "email": "test@test.com",
  "username": "test",
  "fullName": "Test User",
}
```
