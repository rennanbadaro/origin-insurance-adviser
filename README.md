# Origin Insurance Adviser

Simple API that helps users get insurance advice without having to get their hands dirty.
Just provide some basic information about assets and income and let it do its magic

## Requirements

- [NodeJS - 12.x](https://nodejs.org/) *
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

_* If you're using [nvm](https://github.com/nvm-sh/nvm), the project contains a `.nvmrc` file. In order to have the specified NodeJS version installed just run on your command line `nvm install` ._

## Running the project

To start the project on your local environment open up the terminal and do the following commands:

```sh
npm i
npm run start:dev
```

## Tests

The project contains units and functional tests that covers all the business logic.

To run unit tests:
```
npm run test:unit
```

To run functional tests first start the docker then run the test script
```
npm run docker:up
npm run test:functional
```
## Development Notes

Some brief comments about the development process can be found [here](./notes.md)
