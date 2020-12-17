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
        "View Roles",
        "Add Employees",
        "Update EmployeeRole",
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
        case "View Roles":
          viewRole();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "Update EmployeeRole":
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
                              
                                  connection.query(" SELECT * FROM department ", function (error, result) 
                                  {
                                      if (error) throw error;
                                      console.table(result);
                                      mainMenu()

                                    });

                                };

//========================================= 3."View Roles" / READ by, SELECT * FROM



                              function viewRole() {
                              
                                connection.query(" SELECT * FROM role ", function (error, result) 
                                {
                                    if (error) throw error;
                                    console.table(result);
                                    mainMenu()

                                  });

                              };

//========================================= 4."Add Employee" / CREATE: INSERT INTO



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

//========================================= 5." add Roles " / CREATE: INSERT INTO


              function addRole() {
                console.log("Adding a new role ")
                inquirer
                            .prompt([
                                {
                                    name: "role",
                                    type: "input",
                                    message: "What is the title?",
                                  
                                },
                                {
                                    name: "salary",
                                    type: "input",
                                    message: "Please enter the salary?",

                                },
                                {
                                  name: "department_no",
                                  type: "input",
                                  message: "Please enter a new dept ID?",

                              }

                                ]).then(function(answer) {
                                    connection.query("INSERT INTO role SET ? ",
                                    [{
                                      title:answer.role,
                                      salary:answer.salary,
                                      department_id:answer.department_no
                                    }],
                                    function(error,result)
                                    {
                                        if (error) throw error;
                                            connection.query("SELECT * FROM role ", function(error,result)
                                            {
                                              if (error) throw error;
                                                console.table(result);
                                                console.log("A new role added!");
                                                mainMenu();
                                              });
                                              
                                    });
                                  });
                                                              
                           
                      
                    
              };

//========================================= 6." update Roles " / UPDATE: SET WHERE


         function updateEmployeeRole() {
              console.log("updating a employee role!");
              connection.query("SELECT * FROM employee ", function(error, result){
                if (error) throw error;
                console.table(result);

                inquirer
                          .prompt([
                              {
                                  name: "employeeID",
                                  type: "input",
                                  message: "What is the employee ID?",
                                
                              },
                              {
                                  name: "roleID",
                                  type: "input",
                                  message: "Please enter Role ID?",

                              }                            

                              ]).then(function(answer) {
                                  //connection.query("UPDATE employee SET role_id = ? WHERE id =? ",
                                      // [ roleID,employeeID  ],
                                  connection.query("UPDATE employee SET  ? WHERE ? ",
                                  
                                  [ {role_id:answer.roleID },{ id: answer.employeeID}],

                                  function(error,result){
                                        if (error) throw error;
                                             console.table(result);
                                              console.log("A role updated!");
                                              mainMenu(); 
                                              });
                                            
                                  });
                
              
              
              });
            };
            
              