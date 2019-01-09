# Choral Admin WebApp

An example repo for an admin panel of a choir website

Admin panel allows for create, read, edit, and delete
* Choir performances
* Admins
* Audition info
* _May add more features in the future_

# Prerequisites

### Node & NPM 

To install all project dependences

`npm install`

To run vue project in development mode

`
npm run serve
`

To build the vue project

`npm run build`

### Firebase

This project relies on the following firebase features
* firestore
* storage - for storing images
* cloud functions
* security rules for firestore and firebase storage

#### Firebase config
 See /firebase/firebaseConfig.js.sample file for an example file. 

 For information on setting up a firebase project and getting the configuration information visit:

 [https://firebase.google.com/docs/web/setup]( https://firebase.google.com/docs/web/setup)

#### Firebase Cloud Functions

The '/functions' folder contains cloud functions for performing server side operations such as adding and removing user authentication credentials.

Before deploying the cloud functions, you will need to run `npm install` inside of the '/functions' folder

To deploy cloud functions, run

`firebase deploy --only functions`

This requires an installation  of firebase tools. Please see for a complete example

[https://firebase.google.com/docs/functions/get-started](https://firebase.google.com/docs/functions/get-started)

#### Firebase security rules
_To be included later_

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

* **Jacob Goodwin** - *Initial work*
* **Abel Goodwin** - *Initial work*



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Evan You and everyone building the Vue Framework
* Those contributing to libraries key to the success of this project
* Everyone who has and is actively contributing to OSS everywhere
