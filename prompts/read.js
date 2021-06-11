const inquirer = require('inquirer');

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
                    console.log(`Invalid action: ${answer.viewChoice}`);
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

module.exports = readData;