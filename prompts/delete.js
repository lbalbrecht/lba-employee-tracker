const inquirer = require('inquirer');

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

module.exports = deleteData;