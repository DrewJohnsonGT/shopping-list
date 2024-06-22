# Shopping List

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
