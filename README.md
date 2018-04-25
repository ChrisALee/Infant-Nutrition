# Infant Nutrition

“For several years, I have had an idea for a website and/or app that provides parents and caregivers with scientifically-based advice on infant feeding. The website/app would be organized around infant and toddler stages of development, e.g. newborn, supported sitter, independent sitter, crawler, etc. It would provide information on children’s eating skills at that particular stage, types of foods to feed, sample “menus” and recipes, and strategies for feeding in a responsive manner. I’ve attached the document that initially formed the basis for this idea. It was published in 2004 by the American Academy of Dietetics, now the Academy of Nutrition and Dietetics, with a promise that educational materials and platforms would ensue. While the science underpinning this review was excellent (it needs updating and I would guide that), the initial project was funded by Gerber. Gerber of course used this research to provide parents infant feeding information based on developmental stage, but as you can imagine, it guides them to their commercial products:

https://www.gerber.com/why-gerber/the-gerber-nutrition-journey

We have several research projects in which we could use a non-commercial, evidence-based infant feeding website/app upon development. I am a registered dietitian and lactation consultant and expert in the area of infant nutrition and feeding. I would guide the students in all aspects of content. ” — Client, Heather Wasser

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

*   Node.js - version 8.x or greater
*   PostgreSQL
*   Redis

### Installing

First fork and clone the repo

Then:

```sh
$ cd PATH/TO/PROJECT
$ npm install
```

Next install the packages for `CLIENT` and `API` in the same fashion.

To run both `API` and `CLIENT` locally:

```sh
$ npm run dev
```

Then go to `localhost:3000` to see `CLIENT` or `localhost:3001/documentation` to see `API`

NOTE: This requires environment variables, PostgreSQL, and Redis to be set up for `API` and `Client`

For more information on how to set this up, check out the `API` [README.md](api/README.md)

## Deployment to OpenShift

To see how to deploy `CLIENT`, check out the [CLIENT README.md](client/README.md)

To see how to deploy `API`, check out [API README.md](api/README.md)

## Authors

*   **Christopher Lee** - [ChrisALee](https://github.com/chrisalee)
*   **Sufi Khaksari** - [skhaksari](https://github.com/skhaksari)
*   **Scott Krawcyzk** - [czyk14](https://github.com/czyk14)
*   **Carrie Storch** - [carriems](https://github.com/carriems)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
