
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This project is a simple e-commerce backend API built using the [NestJS](https://nestjs.com/) framework. It is designed to manage users, products, and provide role-based access control. The API allows unauthenticated users to view approved products, authenticated users to manage their products, and admins to manage users and products.

## Project setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- PostgreSQL

### Installation

1. Clone the repository:

```bash
$ git clone https://github.com/segun-aderinola/techinnover-api-nestjs.git
```

2. Navigate into the project directory:

```bash
$ cd techinnover-api
```

3. Install the dependencies:

```bash
$ npm install
```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Use the provided `.env.example` file to configure your environment variables.

```bash
DB_HOST=aws-0-eu-central-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.vfxzhjakjwltmosdaahg
DB_PASSWORD=NnoV24pCFjm0MTR6
DB_NAME=postgres
JWT_SECRET=techinnover
```

## Compile and run the project

### Development

To start the project in development mode with hot-reloading:

```bash
$ npm run start:dev
```

### Production

To start the project in production mode:

```bash
$ npm run start:prod
```

### Watching mode

To start the project in development mode with file watching:

```bash
$ npm run start:dev
```

## API Documentation

### Swagger

This project uses Swagger to automatically generate API documentation. You can access the Swagger UI by navigating to:

```
http://localhost:3000/api-docs
```

This will provide a comprehensive view of all available endpoints, request parameters, and response schemas.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X (formerly Twitter)](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open-source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Segun Aderinola](https://x.com/Segun_webx)
- Twitter - [@yourtwitterhandle](https://x.com/Segun_webx)

## License

This project is [MIT licensed](./LICENSE).
