# Development Process Notes

## Architecture and Design Decisions

A Clean architecture based was developed for this project to achieve a very decoupled application. A short overview of the project's dir structure:

- `app`: keeps the code that makes this an actual API accessible via HTTP requests. Here will be stored controllers, routers and everything needed to expose the API and deal with requests which will be delegated to the domain. Future aditions of other communication sources such as gRPC or event handling could also be dealt here as well.

- `domain`: where the good stuff goes :) This layer will contain all the business rules required for this assignment. There you'll find the elements developed to calculate user's insurance advice and its use case `GenerateInsuranceAdvice`.

- `shared`: general code to be shared by any layer, including enums, errors, etc.

_No `infrastructure` layer was added because no external communication was needed for now (e.g. database interaction, messaging, external API calls, etc), so for the sake of simplicity it was not included. Although one could argue that a logger abstraction could be provided by this layer._

<br>

## Development Process

The whole development started from the domain using TDD. This way the effort could be focused on targeting the business logic primarly instead of mixing it up with thoughts about the application layer. These components (app) were "plugged" at the very end making the application accessible via endpoint. The designed architecture helped a lot with this due to its decoupled nature.

After reviewing the specification it came up that the desired output could be achieved by building a series of `profilers`, each of them with a certain specialty (house, vehicle, income, etc). These profilers would work with a known input and based on a provided agreggated result (score) calculate the risk for the given insurance lines according to its evaluation.

Working with enforced contracts of inputs and outputs, this approach opens the possibility to build N profilers and chain them together to achieve the end score result as needed. A [Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) seemed very appropriate.

Finally, with the chain's result a final component can process these scores into an actual insurance advice.

For further details, everything was broken into tasks registred in a [Trello board](https://trello.com/b/9UvnlG25/ms-insurance-adviser).
