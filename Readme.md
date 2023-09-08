# React, Node, Mongo, and MySQL Container

The Node container has access to the mongo connection string via a environment variable `MONGO_URL`, and access to SQL via `SQL_USER, SQL_PASS, SQL_HOST, SQL_PORT`

A general purpose starting point for apps potentially, primarily a learning experience in docker, and docker-compose.


## New Packages
In order to change the packages contained in the node directory cd into the the directory and use your npm commands before running the container.
You can type `npm i --package-lock-only <package_name>` to add the dependency to the `package-lock.json` file only and Docker will install the package for you. Same applies to the react container