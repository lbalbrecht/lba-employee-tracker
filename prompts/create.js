const inquirer = require('inquirer');

// inquirer prompt for the user to add data to the database if they select 'add'
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

module.exports = createData;