USE employees_DB;

INSERT INTO department ( dept_name)
VALUES ( "Gamer");
INSERT INTO department ( dept_name)
VALUES ( "Finance");
INSERT INTO department ( dept_name)
VALUES ( "Network");


INSERT INTO role ( title, salary, department_id)
VALUES ( "Jn.Gamer", 30000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ( "Gamer ", 65000, 1);
INSERT INTO role ( title, salary, department_id)
VALUES ( "Lead Gamer", 75000, 1); 
INSERT INTO role ( title, salary, department_id)
VALUES ( "Accountant", 35000, 2);

INSERT INTO role ( title, salary, department_id)
VALUES ( "Manager", 45000, 3);

INSERT INTO role ( title, salary, department_id)
VALUES ( "System Administrator", 90000, 3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Homer", "Simpson", 6, 6);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Marge ", "Simpson", 5, 5);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Bart", "Simpson", 2, null);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Maggie", "Simpson", 3, null);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Lisa", "Simpson", 4, null);
