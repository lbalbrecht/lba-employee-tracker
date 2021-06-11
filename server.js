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
    database: 'employee_trackerdb',
});

const runTracker = () => {
    // user will choose whether they want to add, view, update, or delete data
    inquirer.prompt({
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
            'Add',
            'View',
            'Update',
            'Delete',
            'Quit'
        ]
    })
        .then((answer) => {
            switch (answer.userChoice) {
                case 'Add':
                    createData();
                    break;

                case 'View':
                    readData();
                    break;

                case 'Update':
                    updateData();
                    break;

                case 'Delete':
                    deleteData();
                    break;

                case 'Quit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

const createData = () => {
    inquirer.prompt({
        type: 'list',
        name: 'addChoice',
        message: 'What would you like to add?',
        choices: [
            'Add new department',
            'Add new role',
            'Add new employee',
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
                    console.log(`Invalid action: ${answer.addChoice}`);
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
            runTracker();

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
                    title: answer.newRole,
                    salary: answer.roleSalary,
                    department_id: answer.roleDepartment
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                }
            );
            console.log(query.sql);
            runTracker();
        })
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
                message: "Please enter the employee's role id",
            },
            {
                name: 'employeeManager',
                type: 'input',
                message: "Please enter the employee's manager id",
            },
        ])
        .then((answer) => {
            console.log('Adding a new employee...\n');
            const query = connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.employeeRole,
                    manager_id: answer.employeeManager
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee added!\n`);
                }
            );

            console.log(query.sql);
            runTracker();
        });
}

// inquirer prompt for the user to view specific information in the database if they select 'view'
const readData = () => {
    inquirer.prompt({
        type: 'list',
        name: 'viewChoice',
        message: 'What would you like to view?',
        choices: [
            'View departments',
            'View roles',
            'View employees',
        ]
    })
        .then((answer) => {
            switch (answer.viewChoice) {
                case 'View departments':
                    viewDepartment();
                    break;

                case 'View roles':
                    viewRole();
                    break;

                case 'View employees':
                    viewEmployee();
                    break;

                default:
                    console.log(`Invalid action: ${answer.viewChoice}`);
                    break;
            }
        })
};

// view registered departments
const viewDepartment = () => {
    connection.query('SELECT name FROM department', (err, res) => {
        if (err) throw err;
        console.log('Generating department list... \n')
        console.log(res);
        runTracker();
    });
}

// view office roles
const viewRole = () => {
    connection.query('SELECT title FROM role', (err, res) => {
        if (err) throw err;
        console.log('Generating role list... \n')
        console.log(res);
        runTracker();
    });
}

// view employees
const viewEmployee = () => {
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err;
        console.log('Generating employee list... \n')
        console.log(res);
        runTracker();
    });
}

// inquirer prompt for the user to update information within the database if they select 'update'
const updateData = () => {
    inquirer.prompt({
        type: 'list',
        name: 'updateChoice',
        message: 'What would you like to view?',
        choices: [
            'Update employee role',
            'Update employee manager'
        ]
    })
        .then((answer) => {
            switch (answer.updateChoice) {
                case 'Update employee role':
                    updateRole();
                    break;

                case 'Update employee manager':
                    updateManager();
                    break;

                default:
                    console.log(`Invalid action: ${answer.updateChoice}`);
                    break;
            }
        })
};

// update a role
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "roleUpdateFirst",
            message: "Please enter the employee's first name"
        },
        {
            type: 'input',
            name: "roleUpdateLast",
            message: "Please enter the employee's last name"
        },
        {
            type: 'input',
            name: "roleUpdateNew",
            message: "Please enter the id for the employee's new role"
        },
    ]).then((answer) => {
        console.log('Updating role...\n');
        const query = connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                {
                    role_id: answer.roleUpdateNew,
                },
                {
                    first_name: answer.roleUpdateFirst,
                    last_name: answer.roleUpdateLast
                },
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role updated!\n`);
            }
        );
        console.log(query.sql);
        runTracker();
    })
};

// update an employee's manager
const updateManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "managerUpdateFirst",
            message: "Please enter the employee's first name"
        },
        {
            type: 'input',
            name: "managerUpdateLast",
            message: "Please enter the employee's last name"
        },
        {
            type: 'input',
            name: "managerUpdateNew",
            message: "Please enter the id for the employee's new manager"
        },
    ]).then((answer) => {
        console.log('Updating manager...\n');
        const query = connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                {
                    manager_id: answer.managerUpdateNew,
                },
                {
                    first_name: answer.managerUpdateFirst,
                    last_name: answer.managerUpdateLast
                },
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} manager updated!\n`);
            }
        );
        console.log(query.sql);
        runTracker();
    })
};

// inquirer prompt for the user to delete information from the database if they select 'delete'
const deleteData = () => {
    inquirer.prompt({
        type: 'list',
        name: 'deleteChoice',
        message: 'What would you like to delete?',
        choices: [
            'Delete department',
            'Delete role',
            'Delete employee',
        ]
    })
        .then((answer) => {
            switch (answer.viewChoice) {
                case 'Delete department':
                    deleteDepartment();
                    break;

                case 'Delete role':
                    deleteRole();
                    break;

                case 'Delete employee':
                    deleteEmployee();
                    break;

                default:
                    console.log(`Invalid action: ${answer.deleteChoice}`);
                    break;
            }
        })
}

// delete a department
const deleteDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: "departmentDelete",
            message: "Please enter the department you would like to remove"
        }
    ).then((answer) => {
        console.log('Deleting the chosen department...\n');
        connection.query(
            'DELETE FROM department WHERE ?',
            {
                name: answer.departmentDelete,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} departments deleted!\n`);
            }
        );
    })
};

// delete a role
const deleteRole = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: "roleDelete",
            message: "Please enter the role you would like to remove"
        }
    ).then((answer) => {
        console.log('Deleting the chosen role...\n');
        connection.query(
            'DELETE FROM role WHERE ?',
            {
                name: answer.roleDelete,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} roles removed!\n`);
            }
        );
    })
};

// delete an employee
const deleteEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "employeeDeleteFirst",
            message: "Please enter the employee's first name"
        },
        {
            type: 'input',
            name: "employeeDeleteLast",
            message: "Please enter the employee's last name"
        }
    ]).then((answer) => {
        console.log('Removing employee...\n');
        connection.query(
            'DELETE FROM employee WHERE ?',
            {
                first_name: answer.managerUpdateFirst,
                last_name: answer.managerUpdateLast
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee removed!\n`);
            }
        );
    })
};

// initiate server
connection.connect((err) => {
    if (err) throw err;
    runTracker();
})