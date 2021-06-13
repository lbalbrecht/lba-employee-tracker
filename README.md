# Employee Tracker

## Description

This is a command-line, Node.js application (i.e. an application operated entirely through the command terminal) that allows the user to manage their employee database. The user may add, check, update, and delete departments, roles, and employees from their database as their staff changes. The application operates through a mysql server and uses the inquirer npm package.

## Setup

To begin, the user opens the command line terminal in the same folder as the server.js file. The command line terminal can be opened by right clicking on the server.js file and clicking on the option "Open in Integrated Terminal."

### Initialization

This section outlines the process of installing the package.json file. If the package.json file already exists, please skip ahead to the [installation](###installation) section.


For the app to operate, the user must install the necessary npm packages (mysql and inquirer). Installation requires a package.json file in the repository's main folder (or the same folder as the server.js file). To install the package.json file, the user inputs the following command into the terminal to initialize Node.js and install the file:

```
npm init -y
```

### Installation

Once the package.json file has been installed, the user may install the npm packages required for the app to function. First, check the "dependencies" section of the package.json file. If both inquirer and mysql are listed as dependencies, the user runs the following command to install the node modules for both packages:

```
npm i
```

If mysql does not appear as a dependency, the user runs the following command to install it:

```
npm i mysql
```

if inquirer does not appear as a dependency, the user runs the following command to install it:

```
npm i inquirer
```

### Launching

Once the npm packages have been installed, the user launches the application by entering the following command:

```
node.server.js
```

## Usage

When the application launches, the user will be presented with a prompt with the options to "Add," "View," "Update," "Delete," and "Quit." Selecting quit will terminate the application. The other options will determine how the user interacts with the information in their database.

### Add

Selecting "Add" presents the user with the following options:

* Add new department
* Add new role
* Add new employee
* Go back

Selecting "Go back" will return the user to the first prompt so they can choose a different function. Selecting any of the "add" options will prompt the user to enter the relevant information for the new data they would like to add to their database

### View

Selecting "View" presents the user with the following options:

* View departments
* View roles
* View employees
* Go back

Selecting a "View" option will render all the information in the respective table

### Update

Selecting "Update" presents the user with the following options:

* Update employee role
* Update employee manager
* Go back

Selecting an "Update" option will prompt the user to change an employee's respective information

### Delete

Selecting "Delete" presents the user with the following options:

* Delete department
* Delete role
* Delete employee
* Go back

Selecting a "Delete" option will prompt the user to delete information from the respective table.

## Contributors

* Leighton Albrecht

[View Github Repository](https://github.com/lbalbrecht/lba-employee-tracker)