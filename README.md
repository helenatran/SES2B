# SES2B

## Build and Deployment Rules
To ensure we follow a clean and efficient development methodology, we will follow the three-tier branch approach when applying changes. This includes the following:

```
master
    ┣━━ feature
           ┗━━ task
```

### Branch Rules

| Branch  | Naming Convention| Example           |
|:--------|:-----------------|:------------------|
| Master  | master           | master            |
| Feature | feature-*        | feature-login     |    
| Task    | task-*           | task-login_button |

***

#### Master

The Master Branch will be used as the final product.
* <b>IMPORTANT NOTE</b> - No direct changes will be made on this branch**

#### Feature

The Feature Branch will stem off the Master Branch and will act as a topic branch. For example, if a new component such as a login feature is to be implemented, a feature branch must be created.

#### Task

The Task Branch will act as the child branch of the Feature Branch to which content can be added. Different goals MUST be spread across other Task Branches. Once the goal is met, branches will be merged into the feature branch via an approved Pull Request (PR). For example:
* Task 1: Create a Login button - Once completed and the PR is approved, this will be merged into the 'feature-login' branch
* Task 2: Change the font size on the login screen - Once completed and the PR is approved, this will also be merged into the 'feature-login' branch. 

***

### Installation Steps

When installing the project on your machine, ensure the following requirements are met:

#### Required Software
* Node JS - ```version 14.17.5``` - [Node JS Download](https://nodejs.org/en/download/)
* MongoDB Compass - ```version 1.28.1``` - [Mongo DB Compass Download](https://www.mongodb.com/try/download/compass)

On initial launch, your folder structure should mirror this:

```
client
    ┣━━ src
backend
    ┣━━ routes
readme.md
```

#### Installing Dependencies

For all cases of installation and starts, it is highly recommended that the dependency to be installed is only installed within the desired directory i.e. if it is a front-end related dependency, then you must install it within the client directory. The same philosophy applies for back-end dependencies. 

##### Backend Server Dependencies

In your favourite command terminal (In this case, Git Bash was used to demonstrate):

```
user@DESKTOP MINGW64 ~/Documents/app-dev/SES2B (master)
$ cd react-backend
...
$ npm install
...
```

##### Frontend Server Dependencies
```
user@DESKTOP MINGW64 ~/Documents/app-dev/SES2B (master)
$ cd react-backend
...
$ npm install
...
```

##### Gif Example
![demo gif](client/demo.gif)