DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department(
 id INT NOT NULL AUTO_INCREMENT ,
 dept_name  VARCHAR(30) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE role (
 id INT AUTO_INCREMENT NOT NULL,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT ,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT , 
PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee