const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    database: 'company',
    password: 'password',
    user: 'root'
})

db.connect((err) => {
    if (err) throw err;
    mainMenuInterface();
})

function mainMenuInterface() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee information', 'Exit application']
        }/* use listOfOptions.push(new inquirer.Separator( "-- End of List --" ));  to show user where the list ends */
    ]).then(response => {
        if (response.choice == 'View all departments') {
            viewDepartments()
        }
        if (response.choice == 'View all roles') {
            viewRoles()
        }
        if (response.choice == 'View all employees') {
            viewEmployees()
        }
        if (response.choice == 'Add a department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentTitle',
                    message: 'What is the new departments name?'
                }
            ]).then(response => {

                const newDept = response.departmentTitle;

                const sqlString = `
                    INSERT INTO departments (dept_name) VALUES ("${newDept}")`

                db.query(sqlString, (err, result) => {
                    if (err) throw err;
                    console.log('\n')
                    console.table(result)
                    console.log('\n')

                    mainMenuInterface();
                });

            })
        }
        if (response.choice == 'Add a role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is the new roles name?'
                },
                {
                    type: 'input',
                    name: 'newSalary',
                    message: 'What is the new roles salary?'
                },
                {
                    type: 'input',
                    name: 'newDepartmentIdentity',
                    message: 'What is the new roles department id?'
                }
            ]).then(response => {
                const addedRole = response.newRole;
                const addedSalary = response.newSalary;
                const addedDeptId = response.newDepartmentIdentity;

                const sqlString = `
                INSERT INTO roles (title, salary, department_id) VALUES ("${addedRole}", "${addedSalary}", "${addedDeptId}")`

                db.query(sqlString, (err, result) => {
                    if (err) throw err;

                    console.log('\n')
                    console.table(result)
                    console.log('\n')

                    mainMenuInterface();
                })
            })
        }
        if (response.choice == 'Add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the new employees first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the new employees last name?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the new employees role?'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'What is the employees manager ID?'
                }
            ]).then(response => {
                const newFirst = response.firstName;
                const newLast = response.lastName;
                const givenRole = response.role_id;
                const givenMngr = response.manager_id;

                const sqlString = `
                INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${newFirst}", "${newLast}", "${givenRole}", "${givenMngr}")`;

                db.query(sqlString, (err, result) => {
                    if (err) throw err;

                    console.log('\n')
                    console.table(result)
                    console.log('\n')

                    mainMenuInterface();
                })
            })
        }
        if (response.choice == 'Update employee information') {
            employeeUpdateInfo()
        }
        if (response.choice == 'Exit application') {
            return console.log('Thank you for working with us!')
        }
    })
};


let employeeUpdateInfo = function () {
    employeeList = [];

    db.query('SELECT * FROM employees',
        function (err, employeeResults) {
            if (err) throw err;
            for (let i = 0; i < employeeResults.length; i++) {
                if (employeeResults.first_name) {
                    employeeList.push(employeeResults[i].first_name + ' ' + employeeResults.last_name);
                } else return;
            }
        }).then(
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeList',
                    message: 'Which employee are we updating the info on?',
                    choices: employeeList
                }
            ]).then(response => {

                const sqlString = `
            select * from employees where first_name + last_name = "${response.employeeList}"`;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeList',
                        message: 'What are we updating?',
                        choices: ["first name", "last name", "role", "manager id"]
                    }
                ])
            })
        )
};

function viewDepartments() {
    const sqlString = `
    SELECT *
    FROM departments`

    db.query(sqlString, (err, result) => {
        if (err) throw err;
        console.log('\n')
        console.table(result)
        console.log('\n')

        mainMenuInterface()
    })
};

function viewEmployees() {
    const sqlString = `
    SELECT *
    FROM employees`

    db.query(sqlString, (err, result) => {
        if (err) throw err;
        console.log('\n')
        console.table(result)
        console.log('\n')

        mainMenuInterface()
    })
};

function viewRoles() {
    const sqlString = `
    SELECT *
    FROM roles`

    db.query(sqlString, (err, result) => {
        if (err) throw err;
        console.log('\n')
        console.table(result)
        console.log('\n')

        mainMenuInterface()
    })
};