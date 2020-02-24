Create a Project With API Authentication

#Dependencies and scaffolding
1. npm init -y
2. npm i
3. npm i express nodemon knex knex-cleaner sqlite3 bcryptjs dotenv cors helmet
    3a. in package.json file, set the scripts server...
        "server": "nodemon index.js"
4. manually create the following folders and files:
    --data folder >> dbConfig.js file > migrations folder > seeds folder
    --routers folder > whatever router.js files
    --helpers > whatever model.js files > maybe a middleware folder with some middleware.js files?
    --api folder > server.js file
    --index.js file
    --.env file (add PORT=#### <--choose your own port number here)
5. in server.js file setup your dependencies
    --const bcrypt = require("bcryptjs");
    --const express = require("express");
    --const helmet = require("helmet");
    --const cors = require("cors");
6. in index.js file, add the necessary info like:
    require('dotenv').config(); 
    const server = require('./api/server');
    const PORT = process.env.PORT || "5000";
    server.listen(PORT, () => console.log(`\n** running on port: ${PORT} **\n`));
7. add the necessary info to your model files in the helper folder, and the router files in your routers folder, and set them up in your server.js file.
8. 


