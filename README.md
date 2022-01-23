# 📞 Phone Catalog [![Deploy](https://github.com/SantiMA10/phone-catalog/actions/workflows/deploy.yml/badge.svg)](https://github.com/SantiMA10/phone-catalog/actions/workflows/deploy.yml) [![visit it](https://img.shields.io/badge/visit-it-blue)](https://phone-catalog-ten.vercel.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), that uses React to show a Phone Catalog and Next.js API routes as the backend for the catalog. 

## It also uses...

- [Chakra UI](https://chakra-ui.com/) as the main component library
- [jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) + [User Event](https://testing-library.com/docs/ecosystem-user-event/) as testing framework
- [eslint](https://eslint.org/) + [prettier](https://prettier.io/) to ensure that the code follows a common style
- [prisma](https://www.prisma.io/) as ORM
- [zx](https://github.com/google/zx) for scripting
- [docker](https://www.docker.com/) to have a MySQL instance locally

# Getting Started

## Configuration

### PlanetScale

If you want to setup a PlanetScale instance to use it to develop locally, you need to create a `.env.cloud.local` (You can use any of the other .env files as a template).

In order to get the `DATABASE_URL`, you have a few options, all these options are explained [here](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale#connecting-your-database).

Once you have the `DATABASE_URL`, you have to run `yarn cloud:migrate` to create the needed tables on PlanetScale.

Then you can use the `yarn cloud:dev` command to start the dev server connected to PlanetScale.

## Development

First, run the development server:

```bash
yarn install

yarn docker:dev // to use a local MySQL instance manage with Docker
yarn cloud:dev // to use a remote MySQL instance manage with PlanetScale
yarn dev // alias for yarn docker:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
yarn install

yarn test // runs all the tests using jest
yarn test:unit // runs all the unit tests using jest
yarn test:integration // runs all the integration tests using jest  ⚠️ it requires a MySQL instance ⚠️
yarn test:watch // runs jest in watch mode

docker:test:integration // setup MySQL using docker and runs all the integration tests
docker:test:watch // setup MySQL using docker and the tests in watch mode
```

# Deploy

This is project is deployed to [Vercel](https://vercel.com/) automatically using GitHub Actions on each push to `main` and uses as database [PlanetScale](https://planetscale.com/), since it is a MySQL-compatible serverless database.
