# 00 Install nodejs

## Steps

* Open terminal!
* Make sure you have `~/.bash_profile`, `~/.zshrc` or `~/.profile`
* Install [NVM (Node Version Manager)](https://github.com/creationix/nvm)

  ```bash
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
  ```
* Restart terminal
* Use NVM to install nodejs
  
  ```bash
  nvm install 0.10.35
  ```
* Wait (a few minutes)
* Run

  ```bash
  node -v
  ```

# 01 Hello World

The first thing to do when you learn a new programming language.

## Run
```bash
node 01_hello_world.js
```

# 02 Read a file

Read file in async style. It is our first async method.

## Run
```bash
node 02_file.js
```

# 03 Read two files

How about reading two files async? It is a bit different from what you usually do.

## Run
```bash
node 03_files.js
```

# 04 Read two files in series

Run two files one by one. AKA chaining.

## Run
```bash
node 04_files2.js
```

# 05 Using modules

Modularize your code.

## Run
```bash
node 05_using_modules.js
```

# 06 Basic HTTP server

Using the http module from nodejs to build our own http server. The purpose is
to understand how much work needs to be done in order to build something modern
and useful.

## Run
```bash
node 06_http_server_1
node 06_http_server_2
node 06_http_server_3
node 06_http_server_4
```

07 HTTP server with ExpressJS and SQLite3
=====

- Build practical http server with [ExpressJS](http://expressjs.com/).
- Use SQLite3 to store the data.

08 Deploy the app on Heroku
=====

- Create Heroku account
- Deploy the app on Heroku
  - [TODO] Convert SQLite3 to Postgre

