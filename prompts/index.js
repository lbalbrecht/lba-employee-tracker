const inquirer = require('inquirer');
const createData = require('./create');
const readData = require('./read');
const updateData = require('./update');
const deleteData = require('./delete');

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

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

module.exports = runTracker