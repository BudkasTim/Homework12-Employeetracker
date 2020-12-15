const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "newuser",
  password: "0_123456",
  database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
mainMenu();
});

// function which prompts the user for what action they should take
function mainMenu() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Plz, select your entry ?",
      choices: [
        "View Employees",
        "View Departments",
        "Add Employees",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "Exit"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;
        case "View Departments":
          viewDepartmnt();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "Remove Employees":
          removeEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Add Role":
          addRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//================================== 1."View Employees"/ READ all, SELECT * FROM

                  function viewEmployee() {
                    console.log("Viewing all employees\n");

                    var results=connection.query
                    ("SELECT employee.id, employee.first_name, employee.last_name, role.title, department_id AS department, role.salary, employee.manager_id FROM employee, role where employee.role_id = role.id ;",
                    function(error,results)
                    {

                      if(error) throw error;

                      
                      console.table(results)
                      console.log(" All Employees \n");
                      mainMenu();
                      
                      })

                    };   
                    

    
//========================================= 2."View Department" / READ by, SELECT * FROM



function viewDepartmnt() {
 
     connection.query("SELECT * FROM department ", function (err, res) 
     {
         if (error) throw error;
         console.table(res);
         mainMenu()

      });

  };


//========================================= 3."Add Employee" / CREATE: INSERT INTO



              function addEmployee() {
                console.log("Adding a new employee!")
                inquirer
                            .prompt([
                                {
                                    name: "firstName",
                                    type: "input",
                                    message: "What is the employee's first name?",
                                  
                                },
                                {
                                    name: "lastName",
                                    type: "input",
                                    message: "What is the employee's last name?",
                                    
                                },
                                {
                                    name: "roleID",
                                    type: "input",
                                    message: "Please enter the role id",

                                },
                                {
                                    name: "manager",
                                    type: "input",
                                    message: "Please enter manager id",
                                }
                                  ]).then(function(answers) {
                                    connection.query("INSERT INTO employee SET ? ",
                                    {
                                      first_name:answers.firstName,
                                      last_name:answers.lastName,
                                      role_id:answers.roleID,
                                      manager_id:answers.manager
                                      
                                    },
                                    function(err,res){
                                      if (err) throw err;
                                      connection.query("SELECT * FROM employee", function(err, results){
                                        if (err) throw err;
                                        console.table(res);
                                        console.log("A new employee added!")
                                        mainMenu();
                                      });
                                      
                                    });
                                                              
                  })
                  
                      
                    
              };

//========================================= 5."Remove Employees" / DELETE, DELETE FROM

// Make a employee array to delete

// function removeEmployees() {
//   console.log("Deleting an employee");

//   var query =
//     `SELECT e.id, e.first_name, e.last_name
//       FROM employee e`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
//       value: id, name: `${id} ${first_name} ${last_name}`
//     }));

//     console.table(res);
//     console.log("ArrayToDelete!\n");

//     promptDelete(deleteEmployeeChoices);
//   });
// }

// // User choose the employee list, then employee is deleted

// function promptDelete(deleteEmployeeChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Which employee do you want to remove?",
//         choices: deleteEmployeeChoices
//       }
//     ])
//     .then(function (answer) {

//       var query = `DELETE FROM employee WHERE ?`;
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query, { id: answer.employeeId }, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         console.log(res.affectedRows + "Deleted!\n");

//         firstPrompt();
//       });
//       // console.log(query.sql);
//     });
// }

// //========================================= 6."Update Employee Role" / UPDATE,

// function updateEmployeeRole() { 
//   employeeArray();

// }

// function employeeArray() {
//   console.log("Updating an employee");

//   var query =
//     `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM employee e
//   JOIN role r
// 	ON e.role_id = r.id
//   JOIN department d
//   ON d.id = r.department_id
//   JOIN employee m
// 	ON m.id = e.manager_id`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const employeeChoices = res.map(({ id, first_name, last_name }) => ({
//       value: id, name: `${first_name} ${last_name}`      
//     }));

//     console.table(res);
//     console.log("employeeArray To Update!\n")

//     roleArray(employeeChoices);
//   });
// }

// function roleArray(employeeChoices) {
//   console.log("Updating an role");

//   var query =
//     `SELECT r.id, r.title, r.salary 
//   FROM role r`
//   let roleChoices;

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     roleChoices = res.map(({ id, title, salary }) => ({
//       value: id, title: `${title}`, salary: `${salary}`      
//     }));

//     console.table(res);
//     console.log("roleArray to Update!\n")

//     promptEmployeeRole(employeeChoices, roleChoices);
//   });
// }

// function promptEmployeeRole(employeeChoices, roleChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Which employee do you want to set with the role?",
//         choices: employeeChoices
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "Which role do you want to update?",
//         choices: roleChoices
//       },
//     ])
//     .then(function (answer) {

//       var query = `UPDATE employee SET role_id = ? WHERE id = ?`
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query,
//         [ answer.roleId,  
//           answer.employeeId
//         ],
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log(res.affectedRows + "Updated successfully!");

//           firstPrompt();
//         });
//       // console.log(query.sql);
//     });
// }



// //////////////////========================= 7."Add Role" / CREATE: INSERT INTO

// function addRole() {

//   var query =
//     `SELECT d.id, d.name, r.salary AS budget
//     FROM employee e
//     JOIN role r
//     ON e.role_id = r.id
//     JOIN department d
//     ON d.id = r.department_id
//     GROUP BY d.id, d.name`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
//     const departmentChoices = res.map(({ id, name }) => ({
//       value: id, name: `${id} ${name}`
//     }));

//     console.table(res);
//     console.log("Department array!");

//     promptAddRole(departmentChoices);
//   });
// }

// function promptAddRole(departmentChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "roleTitle",
//         message: "Role title?"
//       },
//       {
//         type: "input",
//         name: "roleSalary",
//         message: "Role Salary"
//       },
//       {
//         type: "list",
//         name: "departmentId",
//         message: "Department?",
//         choices: departmentChoices
//       },
//     ])
//     .then(function (answer) {

//       var query = `INSERT INTO role SET ?`

//       connection.query(query, {
//         title: answer.title,
//         salary: answer.salary,
//         department_id: answer.departmentId
//       },
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log("Role Inserted!");

//           firstPrompt();
//         });

//     });
//}