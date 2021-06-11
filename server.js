const mysql = require('mysql');
const runTracker = require('./prompts/index')

// establish mysql server
const connection = mysql.createConnection({
    // define host
    host: 'localhost',
    //define port
    port: 3306,

    //define user
    user: 'root',

    //require user password
    password: 'password',
    // define database
    database: 'employee_trackerdb',
});

// initiate server
connection.connect((err) => {
    if (err) throw err;
    console.log("success!")
    runTracker();
})