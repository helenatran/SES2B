# SES2A

## Build and Deployment Rules
To ensure we follow a clean and efficient development methodology, we will follow the three-tier branch approach when applying changes. This includes the following:

```
master
  |-- feature
      |-- task
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
* IMPORTANT NOTE - No direct changes will be made on this branch**

#### Feature

The Feature Branch will stem off the Master Branch and will act as a topic branch. For example, if a new component such as a login feature is to be implemented, a feature branch must be created.

#### Task

The Task Branch will act as the child branch of the Feature Branch to which content can be added. Different goals MUST be spread across other Task Branches. Once the goal is met, branches will be merged into the feature branch via an approved Pull Request (PR). For example:
* Task 1: Create a Login button - Once completed and the PR is approved, this will be merged into the 'feature-login' branch
* Task 2: Change the font size on the login screen - Once completed and the PR is approved, this will also be merged into the 'feature-login' branch. 
