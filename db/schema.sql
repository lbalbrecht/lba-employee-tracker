DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES('Information Technology');

INSERT INTO department(name)
VALUES("Human Resources");

INSERT INTO department(name)
VALUES('Legal');

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", "100000", "1");

INSERT INTO role(title, salary, department_id)
VALUES("Project Manager", "120000", "1");

INSERT INTO role(title, salary, department_id)
VALUES("Representative", "60000", "2");

INSERT INTO role(title, salary, department_id)
VALUES("HR Manager", "70000", "2");

INSERT INTO role(title, salary, department_id)
VALUES("Copyright attorney", "90000", "3");

INSERT INTO role(title, salary, department_id)
VALUES("Defense attorney", "110000", "3");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Steve", "Harvey", "1", "2");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Pat", "Zajak", "2", 0);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Snow", "3", "4");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Eddard", "Stark", "4", 0);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Jean-Luc", "Picard", "5", "6");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("William", "Riker", "6", 0);






