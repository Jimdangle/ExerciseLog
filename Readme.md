# React, Node, and Mongo Containers
The Node container has access to the mongo connection string via a environment variable `MONGO_URL`, 


## New Packages
In order to change the packages contained in the node directory cd into the the directory and use your npm commands before running the container.
You can type `npm i --package-lock-only <package_name>` to add the dependency to the `package-lock.json` file only and Docker will install the package for you. Same applies to the react container

## Exercise Log
General plan Trello : https://trello.com/b/Ft4qThw4/exlog
Sprint 1 Trello : https://trello.com/b/8lXIDQ55/exlogs1
Notion : https://www.notion.so/Exercise-Log-d2a877039f5f4333b6b188be37c59342?pvs=4

The general idea is to create an app that allows users to track their workouts. The app will then  process these collected workouts and display some sort of information about your training, and potential ways to improve

### Baseline Requirements (MVP)
* User can create their own custom account that tracks their own workouts
* User can create workout logs, edit workout logs, remove workout logs
* User can see impact of recent workouts (a time view based on their logs posted within that range)

### Sugar
* Ideally I want the users to be able to add, edit, and remove their workouts logs in an offline esq state where it does not require a http request for each and every exercise you want to add to a log. 
