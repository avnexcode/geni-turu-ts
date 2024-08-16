# Express API Starter with Typescript

How to use this template:

[Express API Starter with Typescript](https://github.com/w3cj/express-api-starter-ts)

or:

```sh
npx create-express-api --typescript --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

### npm
```sh
npm install
```
### pnpm
```sh
pnpm install
```
### yarn
```sh
yarn
```
### bun
```sh
bun install
```
### deno
```
Deno does not require separate package installations.
```

## Lint

### npm
```sh
npm run lint
```
### pnpm
```sh
pnpm lint
```
### yarn
```sh
yarn lint
```
### bun
```sh
bun run lint
```
### deno
```sh
deno lint
```

## Test

### npm
```sh
npm run test
```
### pnpm
```sh
pnpm test
```
### yarn
```sh
yarn test
```
### bun
```sh
bun test
```
### deno
```sh
deno test
```

## Development

### npm
```sh
npm run dev
```
### pnpm
```sh
pnpm dev
```
### yarn
```sh
yarn dev
```
### bun
```sh
bun run dev
```
### deno
```sh
deno run --watch main.ts
```
