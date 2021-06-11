const inquirer = require('inquirer');

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
            message: "Please enter the employee's new role"
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
                    last_name: answer.roleUpdateLast,
                },
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role updated!\n`);
            }
        );
    })
};

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
            message: "Please enter the employee's new manager"
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
    })
};

module.exports = updateData;