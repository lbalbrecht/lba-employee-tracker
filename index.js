// install npm packages
const mysql = require('mysql');
const inquirer = require('inquirer');

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
    database: 'employee-trackerDB',
});

// initiate server
connection.connect((err) => {
    if (err) throw err;
    runTracker();
})

// write primary function for server, this will be the inquirer function
const runTracker = () => {
    // user will choose whether they want to add, view, update, or delete data
    inquirer.prompt({
        type: 'rawlist',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
            'Add',
            'View',
            'Update',
            'Delete'
        ]
    })
    .then((answer) => {
        switch (answer.userChoice) {
            case 'Add':
                addData();
                break;

            case 'View':
                viewData();
                break;

            case 'Update':
                updateData();
                break;

            case 'Delete':
                deleteData();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    })
};

// inquirer prompt for the user to add data to the database if they select 'add'
const addData = () => {

};

// inquirer prompt for the user to view specific information in the database if they select 'view'
const viewData = () => {

};

// inquirer prompt for the user to update information within the database if they select 'update'
const updateData = () => {

};

// inquirer prompt for the user to delete information from the database if they select 'delete'
const deleteData = () => {
    
}