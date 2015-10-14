00 Install
=====

* Open terminal!
* Make sure you have `~/.bash_profile`, `~/.zshrc` or `~/.profile`
* Install [NVM (Node Version Manager)](https://github.com/creationix/nvm)

  ```bash
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
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

01 Hello World
=====

node 01\_hello\_world.js

02 Read a file
=====

node 02\_file.js

03 Read two files
=====

node 03\_files.js

04 Read two files in series
=====

node 04\_files2.js

05 Using modules
=====

node 05\_using\_modules.js

06 Basic HTTP server
=====

Using the http module from nodejs to build our own http server. The purpose is
to understand how much work needs to be done in order to build something modern
and useful.

```bash
node 06\_http\_server\_1
node 06\_http\_server\_2
node 06\_http\_server\_3
node 06\_http\_server\_4
```

07 HTTP server with ExpressJS and SQLite3
=====

- Build practical http server with [ExpressJS](http://expressjs.com/).
- Use SQLite3 to store the data.

08 Deploy the app on Heroku
=====

- Create Heroku account
- Deploy the app on Heroku
  - Convert SQLite3 to Postgre

