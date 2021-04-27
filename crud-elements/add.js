const inquirer = require('inquirer');

module.exports = {
    addDepartment: function () {
        inquirer
            .prompt({
                name: 'newDepartment',
                type: 'input',
                message: 'Please enter the title of your new department',
            })
            .then((answer) => {
                console.log('Inserting a new product...\n');
                const query = connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} department added!\n`);
                        // Call updateProduct AFTER the INSERT completes
                        // updateProduct();
                    }
                );

                console.log(query.sql);
            });
    },

    addRole: function () {
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
                console.log('Inserting a new product...\n');
                const query = connection.query(
                    'INSERT INTO role SET ?',
                    {
                        name: answer.newRole,
                        salary: answer.newSalary
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} role added!\n`);
                        // Call updateProduct AFTER the INSERT completes
                        // updateProduct();
                    }
                );

                console.log(query.sql);
            });
    },

    addEmployee: function () {
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
            console.log('Inserting a new product...\n');
            const query = connection.query(
                'INSERT INTO role SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                    // Call updateProduct AFTER the INSERT completes
                    // updateProduct();
                }
            );

            console.log(query.sql);
        });
    },
}