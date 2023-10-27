# React, Node, and Mongo Containers
The Node container has access to the mongo connection string via a environment variable `MONGO_URL`, 

## Set-up Guide
### Requirements:
 - Docker / Docker Desktop
 - Make or Mingw32-make
 - Node

### Steps:
1. After having the required installs clone this repository onto your machine
2. Use make to build the docker images with `make build`
   * If you are on windows / using Mingw32 you can type `Set-Alias -Name make -Value mingw32-make` to alias the command and make it easier
   * **has to be re copied into terminal each time the window is closed**
3. Run the docker containers using `make start` or `make startd`
4. The frontend is **hot-reloaded** so when you change files it is immediatley updated
5. The backend requires a restart either `ctrl-c` to close the containers or `make stop` if you ran in detatched mode then just re-run with `make start`


## New Packages
1. In order to change the packages cd into either the frontend or backend directory.
2. You can type `npm i --package-lock-only <package_name>` to add the dependency to the `package-lock.json` file only and Docker will install the package for you


## Make Commands
In order to run the program I recommend having make or mingw32-make installed. You can then do `make start` or `make stop` to control the execution. 
`start` : runs containers
`startb`: Builds and runs the containers
`startd`: run containers in detached mode
`stop`  : stops running containers
`clean` : removes containers from docker
`buildc`: builds the containers ignoring cached information
`build` : build containers using cached information
`node-test` : Windows specific, automatically finds node container, and runs tests on it

If you have `mingw32-make` and Powershell you can alias it to `make` via `Set-Alias -Name make -Value mingw32-make`

## Test
after running the docker container type `docker container ls` to find the container id for node container

type `docker exec -it <container id> sh -c "npm run test"`

Windows automatically grab id and run test: `docker exec -it ((docker container ls | findstr "node").split()[0]) sh -c "npm run test"`



## Exercise Log Plan
* General plan Trello : https://trello.com/b/Ft4qThw4/exlog
* Sprint 1 Trello : https://trello.com/b/8lXIDQ55/exlogs1
* Notion : https://www.notion.so/Exercise-Log-d2a877039f5f4333b6b188be37c59342?pvs=4

The general idea is to create an app that allows users to track their workouts. The app will then  process these collected workouts and display some sort of information about your training, and potential ways to improve

### Baseline Requirements (MVP)
* User can create their own custom account that tracks their own workouts
* User can create workout logs, edit workout logs, remove workout logs
* User can see impact of recent workouts (a time view based on their logs posted within that range)

### Sugar
* Ideally I want the users to be able to add, edit, and remove their workouts logs in an offline esq state where it does not require a http request for each and every exercise you want to add to a log. 
