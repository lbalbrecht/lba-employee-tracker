DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
    id INTEGER(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER(10) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INTEGER(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
);