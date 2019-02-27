# Politico

This is a web application designed to be a platform which both the politicians and citizens can use.
Politico enables citizens to vote for politicians running for different offices.


[![Build Status](https://travis-ci.com/nobioma1/Politico.svg?branch=develop)](https://travis-ci.com/nobioma1/Politico)   |   [![Coverage Status](https://coveralls.io/repos/github/nobioma1/Politico/badge.svg?branch=develop)](https://coveralls.io/github/nobioma1/Politico?branch=develop)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
## Installing
* Clone Repository
```$ git clone https://github.com/nobioma1/Politico.git```
* Change Directory 
```$ cd Politico```
* Install Node Modules 
```$ npm i```
* Setup Environment Variables (.env) on root folder 
```
TEST_DATABASE_URL
DATABASE_URL
SECRET
NODE_ENV
```
* To start API 
```$ npm start```

## Running the tests
To run tests on api
- ```$ npm test```
- or using Postman

## Built With
* [Javascript](http://es6-features.org/) 
* [Express](https://expressjs.com/) - The web framework used

HTTP VERB | URI PATH | DESCRIPTION
------------ | ------------- | -------------
POST | /api/v1/auth/signup | User can create account 
POST | /api/v1/auth/login | User can login
POST | /api/v1/parties | Admin can create Party 
PUT | /api/v1/parties/:partyId | Admin can edit party
GET | /api/v1/parties | User can get all parties
GET | /api/v1/parties/:partyId | User can get a party
DELETE | /api/v1/parties/partyId | User can delete a party
POST | /api/v1/offices | Admin can create an office
GET | /api/v1/offices/:officeId | User can get an office
GET | /api/v1/offices | User can get all offices
POST | /api/v1/offices/register | Admin can register candidate for office
POST | /api/v1/vote | User can vote candidate
GET | /api/v1/voted/userId | Votes by a user
GET | /api/v1/offices/:officeId/result | User can view election results

### Links:
- API Host: https://politicho-ch3.herokuapp.com
- UI: http://nobioma1.github.io/Politico
- Documentation: 


## Authors

* **Obioma Noble Nnaemeka** - *Initial work* - [Politico](https://github.com/nobioma1/Politico)
