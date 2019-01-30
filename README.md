# Politico

This is a web application designed to be a platform which both the politicians and citizens can use.
Politico enables citizens to vote for politicians running for different offices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Dependencies
- body-parser
- express
- joi
- morgan

Dev Dependencies
- babel-cli
- babel-preset-env
- chai
- chai-http
- eslint
- eslint-config-airbnb-base
- eslint-plugin-import
- mocha
- nodemon

### Installing
To install and get app running:
- Cd into cloned directory

----installing packages------
Express, body-parser, morgan, joi - npm install --save express body-parser morgan joi 
nodemon(node monitor) - globally - npm i -g nodemon

-----setting up eslint------
- npm i -D eslint eslint-config-airbnb-base eslint-plugin-import
- Create .eslintrc.js file on the root directory, in file:
	module.exports = { 
		"extends": "airbnb-base",
		"rules": {
		"linebreak-style": 0
	    }  
	};

## Running the tests

To run tests on api
- npm tests
- or using Postman

## Deployment


## Built With

* [Express](https://expressjs.com/) - The web framework used
* [Joi](https://github.com/hapijs/joi) - For Validation 

## Contributing


## Versioning
 

## Authors

* **Obioma Noble Nnaemeka** - *Initial work* - [Politico](https://github.com/nobioma1/Politico)

See also the list of [contributors](https://github.com/nobioma1/Politico/contributors) 

## License

## Acknowledgments

* @monehin
