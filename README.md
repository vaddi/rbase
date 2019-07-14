# rbase #

A simple React skeleton App.



## What is this repository for? ##

* A simple React Skeleton
* Version: 0.1.1



## How do I get set up? ##

> You'll need to install yarn the package manager. See installation docs for more Deatails: [https://yarnpkg.com/lang/en/docs/install/]()

Clone the Repository:

    git clone https://github.com/vaddi/rbase.git

Get into the Repositiory Folder:

    cd rbase



## Configuration ##

Configure your application by edition package.json` or use yarn to setup the new Application Name, Version, Dependencies, etc.:

    yarn init

### API Key storing ###

Can be set into an `.env` file into the main directory. Yarn will read and add them automaticly when call `yarn start`. [Read more](#enviroment)

```
REACT_APP_RESOLVER_SECRET=YourSecret
REACT_APP_RESOLVER_URL=https://domein.tld/resolver.php
REACT_APP_MOCKUP_APIKEY=XXXXXXXXXX
REACT_APP_WEATHER_APIKEY=XXXXXXXXXX
REACT_APP_HOST_ENV=staging
```


## Run your Application ##

Run yarn to load dependencies:

    yarn

Run Application:

    yarn start


## Using a Resolver ##

If you are unable to request the Endpoint direclty or only has one which delivering xml data, you can setup a simple PHP Resolver on you own Webserver to fetch data over them instead of you local system. See the Component Feeds or Defcon, they need them to get data and doesn't request direcly to the XML Endpoints.

[resolver.php](./public/Scripts/resolver.php)

## Links ##

### Learn React ###
* [codecademy.com](https://www.codecademy.com/) 
* [facebook.github.io](https://facebook.github.io/react/) 

### Yarn ###
* [yarnpkg.com](https://yarnpkg.com/lang/en/docs/install/)
* [code.facebook.com](https://code.facebook.com/posts/1840075619545360)
* [enviroment](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d)

### Babel ###
* [babeljs.io](https://babeljs.io/)
* [babeljs.io/learn-es2015](https://babeljs.io/learn-es2015/)
