# Colorado Mormon Chorale Webapp

The public repo for the build of the coloradomormonchorale.org application

## Getting Started

With NPM/Node installed fork/clone this repository. Within the root directory perform an npm install.

### Prerequisites

Node & NPM.

```text
Give examples
```

A firebase account. See ./firebase/firebaseConfig.js.sample file for an example file. You will also need to create an initial authenticated user in firebase.

__Example will be provided in the future__

### Installing

Clone the repository

```unix
git clone https://github.com/abelgoodwin1988/coloradomormonchorale
```

move to directory and perform NPM install

```unix
cd coloradomormonchorale
npm install
```

run the web app in a local env

```unix
npm run serve
```

## Running the tests

### Break down into end to end tests

### And coding style tests

## Deployment

At current we're deploying to gitpages. Checkout the gh-pages branch and run

```unix
npm run build
```

This will generate up-to-date css, javascript and html for serving up a static website. Copy the `./dist/index.html` file to `./index.html`. Update all references to `=dist/...`.

Commit and push changes to Github.

```unix
git add -A && git commit -am "new build" && git push
```

## Built With

* [Vue](https://vuejs.org/) - The web framework used
* [Vuex](https://github.com/vuejs/vuex) - State management for Vue
* [Vue-router](https://github.com/vuejs/vue-router) - Routing management for Vue
* [NPM](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

As a stable deployment version emerges we will begin implementing a versioning methodology, potentially following [SemVer](http://semver.org/).

For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Abel Goodwin** - *Initial work*
* **Jacob Goodwin** - *Initial work*


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Evan You and everyone building the Vue Framework
* Those contributing to libraries key to the success of this project
* Everyone who has and is actively contributing to OSS everywhere
