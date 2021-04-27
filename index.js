// install npm packages
const mysql = require('mysql');
const inquirer = require('inquirer');

// CRUD elements organized into separate js files for the sake of making code readable
// const add = require('./crud-elements/add');
// const view = require('./crud-elements/view');
// const update = require('./crud-elements/update');
// const del = require('./crud-elements/delete')

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
    inquirer.prompt({
        type: 'list',
        name: 'addChoice',
        message: 'What would you like to add?',
        choices: [
            'Add new department',
            'Add new role',
            'Add new employee',
            'Delete'
        ]
    })
        .then((answer) => {
            switch (answer.addChoice) {
                case 'Add new department':
                    addDepartment();
                    break;

                case 'Add new role':
                    addRole();
                    break;

                case 'Add new employee':
                    addEmployee();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

// adds a new department
const addDepartment = () => {
    inquirer
        .prompt({
            name: 'newDepartment',
            type: 'input',
            message: 'Please enter the title of your new department',
        })
        .then((answer) => {
            console.log('Adding a new department...\n');
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.newDepartment
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} department added!\n`);
                }
            );
            console.log(query.sql);
        });
};

// adds a new role
const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'Please enter the title of your new role',
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'Please enter the salary for this role',
            },
            {
                name: 'roleDepartment',
                type: 'input',
                message: 'Please enter the department this role is in',
            },
        ])
        .then((answer) => {
            console.log('Adding a new role...\n');
            const query = connection.query(
                'INSERT INTO role SET ?',
                {
                    name: answer.newRole,
                    salary: answer.newSalary
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                }
            );

            console.log(query.sql);
        });
};

// adds a new employee
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "Please enter the employee's first name",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "Please enter the employee's last name",
            },
            {
                name: 'employeeRole',
                type: 'input',
                message: "Please enter the employee's role",
            },
            {
                name: 'employeeManager',
                type: 'input',
                message: "Please enter the employee's manager",
            },
        ])
        .then((answer) => {
            console.log('Adding a new employee...\n');
            const query = connection.query(
                'INSERT INTO role SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                }
            );

            console.log(query.sql);
        });
}

// inquirer prompt for the user to view specific information in the database if they select 'view'
const viewData = () => {
    inquirer.prompt({
        type: 'rawlist',
        name: 'viewChoice',
        message: 'What would you like to view?',
        choices: [
            'View departments',
            'View roles',
            'View employees',
        ]
    })
    .then((answer) => {
        switch (answer.userChoice) {
            case 'View department':
                viewDepartment();
                break;

            case 'View role':
                viewRole();
                break;

            case 'View employee':
                viewEmployee();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    })
};

// view registered departments
const viewDepartment = () => {
    connection.query('SELECT name FROM department', (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}

const viewRole = () => {
    connection.query('SELECT name FROM role', (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}

const viewEmployee = () => {
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}



// inquirer prompt for the user to update information within the database if they select 'update'
const updateData = () => {
    inquirer.prompt({
        type: 'rawlist',
        name: 'viewChoice',
        message: 'What would you like to view?',
        choices: [
            'Update employee role',
            'Update employee manager'
        ]
    })
    .then((answer) => {
        switch (answer.userChoice) {
            case 'Update employee role':
                update.updateRole();
                break;

            case 'Update employee manager':
                update.updateManager();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    })
};

// inquirer prompt for the user to delete information from the database if they select 'delete'
const deleteData = () => {
    inquirer.prompt({
        type: 'rawlist',
        name: 'viewChoice',
        message: 'What would you like to delete?',
        choices: [
            'Delete department',
            'Delete role',
            'Delete employee',
        ]
    })
    .then((answer) => {
        switch (answer.userChoice) {
            case 'Delete department':
                del.deleteDepartment();
                break;

            case 'Delete role':
                del.deleteRole();
                break;

            case 'Delete employee':
                del.deleteEmployee();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    })
}