# tRPC Demo

This sample project demonstrates the use of the [tRPC library](https://trpc.io). It is a monorepo (using [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces)) with both a client and a server.

## Prerequisites

Run `yarn install` to install the dependencies from the project root directory.

### Server

In order to be able to fetch the data, you need to setup a database first. This project uses [Prisma](https://www.prisma.io), and a schema is already defined in `packages/server/prisma/schema.prisma`.

To setup the database:

1. Open the server `.env` file and set the `DATABASE_URL` variable to the URL of your database
2. Run `yarn workspace @w/server prisma db push` to align the database with the Prisma schema and generate the Prisma client

### Client

The client is a simple React app managed by [Vite](https://vitejs.dev). It does not require any setup.

## Running The Project

Run `yarn dev` from the project root directory to start the server and the client.

The server runs on port `8080`, while the client dev server runs on port `3000`.
