# Node.JS: BeCode TrouvKach
***
> A simple react/node app, locating the ATMs nearby.

* * *

- Type of challenge: **consolidation for React, Learning for MongoDB**
- Repository : **`trouvkach`**
- Deadline : **13/12/2019 5:00 pm**
- Team : **by team of 3 or 4**
- Submission : **[Google Form]()**



## Introduction

This project is focusing on the realisation of your very first WebApp and will fit perfectly your learning goals and comprehension of both React and Node. You will also have to use a third part API. 

## Specifications

The specifications for this project are basically simple: we need a web application that can locate your geographical position and list the nearby's ATMs.
The user will be able to display details for each ATM and eventually mark them as empty, update their informations or add an ATM in a "To delete" list.

### Data structure

The ATM's datas already exist, we provide them to you as to *dump* MongoDB. You will find them in the folder  [_dev](./_dev).

> ☝️ **NOTE:** To use these dump you will have to execute two specifics scripts `npm run mongo:import:banks`  and `npm run mongo:import:teminals` **after having started your Docker container**. We suggest the use of  [MongoDB Compass](https://www.mongodb.com/products/compass) or [Robo 3T (formerly RoboMongo)](https://robomongo.org) as Database Client.
> 
We have two types of datas: **banks** and **terminals**.

#### Terminals

A terminal represent one or several ATMs available in a given place.
Each terminal is caracterised by the following informations: 

* an **id** (`_id`, `ObjectID`)
* a **latitude** (`latitude`, `Number`)
* a **longitude** (`longitude`, `Number`)
* an **address** (`address`, `String`, facultative)
* a **bank** (`bank`, `ObjectID`, facultative)
* a **state** of filing  (`empty`, `Boolean`, facultative)
* a **creation's date** (`created_at`, `String`)
* an **update's date** (`updated_at`, `String`) 
* a **deleted's date** (`deleted_at`, `String`, facultative)

#### Banks

A bank represent the legal owner of a terminal.
Each bank is caracterised by :

* an **id** (`_id`, `ObjectID`)
* a **name** (`name`, `String`)
* a **country** (`country`, `String`)
* a **color** (`color`, `String`)
* an **icon** (`icon`, `String`)
* a **URL** (`url`, `String`)
* a **creation's date** (`created_at`, `String`)
* an **update's date** (`updated_at`, `String`) 
* a **deleted's date** (`deleted_at`, `String`, facultative)

### Technical constraint

You are totally free on the design's choice and to complicatedevelop more functionnalities
Your only constraint: you have to display the distance between the user and each ATM that are displayed.

##### Interactive map
You have to use an interactive map. OpenStreetMap is actually the best choice, you will have to use it with Leaflet. 

> ☝️ **NOTE:** Adding and interactive map can be a really hard task, be sure that everything else is ok before working on it.

#### Mockups & Design

We didn't made any mockup nor design for this project, the first task of your group will be their conception.

> 👋 **HEY!** do not hesitate to show us your mockups, it's the best way to assure you that you have a good comprehension of the project


#### Technical Stack

You actually have a **technical stack** to follow.

##### Back-end

A `REST API` using:

- **Node.js**
- **MongoDB**

##### Front-end

A `Single Page App` using:

- **React**

#### Toolchain / Dev Env

The project is divided in two distinct parts: back-end and front-end. We prepared a starter with a premade dev environment that can be used again for other following projects. 

##### Environment

The project is provided with a `docker-compose.yml`  and its documentation in markdown: [`docker-readme.md`](./docker-readme.md).
The whole project's code will be written in `src`.  The compiling tools are configurated to push the compilated files in the `bin` folder.

> ⚠️ **WARNING:** Never **ever** put your modifications to the project in the bin's files ! He will be replaced by a new bin folder at your next compilation!

##### Back-end

Back-end part will be compiled with [BabelJS](https://babeljs.io). The back-end's code is located in  `src/server`.

We prepared for you a little snippet of functionnal code that configure your server **express**, an API route : `GET /hello` and the *middleware* **static** to display de client's files.

You are free to use this snippet or rewrite it. 
 
###### Compilation

There is two compilation's options :

- `npm run build:server` (compile your code)
- `npm run work:server` (compile then observe your files and recompile if you make any modifications)
> ☝️ **NOTE :** Do not forget to run your docker-compose before building the back-end part.

##### Front-end

For the front-end part your code will be compiled/packaged with  [Webpack](https://webpack.js.org/). The code is written in  `src/client`.

> ☝️ **NOTE :** Webpack is a powerfull tool that can be complex to learn. We suggest you to take some time to learn this tool during your "pâturages" and maybe provide your collegues a workshop about it.

Like the back-end part, we prepared a little snippet of code displaying a React component with the text "*Hello, World*".
 
###### Compilation

To compile the front-end code there is two options:

- `npm run build:client` (compile your code)
- `npm run work:client` (compile then observe your files to recompile them in case of any modifications)

##### Prettier & ESLint

The project is configured to use  [Prettier](https://prettier.io) & [ESLint](https://eslint.org).

###### Compilation

To check your files with ESLint and Prettier you can also run this command:  `npm run lint`.

###### Hooks git

The project is also configured with a *hook* de **precommit** for git: when you will try to commit your files, ESLint and Prettier will be executed and, in case of error, the commit will be canceled to let you correct your mistakes. This way you will have the certitude of commiting files exempt of potential problems. 

#### Deployment

We are expecting a **functionnal** and *deployed* project.
One of the solutions is to use  [**Heroku**](https://www.heroku.com). To host your Database, Heroku is working with [**mLab**](https://mlab.com) .

* * *

Have fun and good work.

