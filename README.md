# Shopping List

## Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) - to run the client react app, nodejs server, and postgres database in separate containers
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/) +
  [Zod Prisma Types](https://www.npmjs.com/package/zod-prisma-types) - I
  originally was manually defining my zod schemas and TypeScript types in tandem
  with the Prisma schema. But I found this library and it made the process much
  easier.

## How to run locally

1. Run the project containers

```bash
  pnpm start
```

This will start the database, app, and server containers.
App will be available at [http://localhost:3000](http://localhost:3000)

If you want to run the app and client on local servers with hot-reloading, you can run the following commands:

```bash
  # start database container
  pnpm start:db

  # start server container
  cd server
  pnpm install
  pnpm start

  # start app container
  cd client
  pnpm install
  pnpm start
```
