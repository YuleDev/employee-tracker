const inquirer = require('inquirer');
const managers = require('./utils/managers');
const roles = require('./utils/roles');
const employees = require('./utils/employee');
const departments = require('./utils/departments');
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

function mainMenuInterface () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee information', 'Exit application']
        }/* use listOfOptions.push(new inquirer.Separator( "-- End of List --" ));  to show user where the list ends */
    ]).then(response => {
        if(response.choice == 'View all departments') {
            viewDepartments()
        }
        if(response.choice == 'View all roles') {
            viewRoles()
        }
        if(response.choice == 'View all employees') {
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
                        if(err) throw err;
                        console.log('\n')
                        console.table(result)
                        console.log('\n')

                        mainMenuInterface();
                    });
                
            })
        }
        if(response.choice == 'Add a role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is the new roles name?'
                }
            ]).then((newRoleInfo) => {
                newRoleInfo.insertNewRole(newRoleInfo);
                mainMenuInterface()
            })
        }
        if(response.choice == 'Add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the new roles name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the new roles name?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the new roles name?'
                },
                {
                    type: 'input',
                    name: 'employeerole',
                    message: 'What is the employees roles?'
                }
            ]).then((addedEmployee) => {
                addedEmployee.insertNewEmployee(/* use template literals for multiple info into one func rather than have multiple funcs? */)
                mainMenuInterface()
            })
        }
        if(response.choice == 'Update employee information') {
            employeeUpdateInfo()
        }
        if (response.choice == 'Exit application') {
            return console.log('Thank you for working with us!')
        }
    })
};

function viewDepartments() {
    const sqlString = `
    SELECT *
    FROM departments`

    db.query(sqlString, (err, result) => {
        if(err) throw err;
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
        if(err) throw err;
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
        if(err) throw err;
        console.log('\n')
        console.table(result)
        console.log('\n')

        mainMenuInterface()
    })
};

/* ).then(function ({ first_name, last_name, manager }) {
            connection.query("INSERT INTO employee (first_name, last_name, manager) 
                 VALUES ?", ('first_name', 'last_name', 'manager'), function (err, result) {
                if (err) throw err;
}) */


/*

make user of oop like in team profile generator

make a function to view table of departments names and id's for "view all departments"

make a function to see a table for "view all roles" which will hold:
-job title
-role id
-department that role belongs to
-salary of role

make a function to view all employees table which will hold:
-employee id
-first name
-last name
-job title
-departent
-salary
-managers of employee

make a function for adding a department name to the database

make a funciton for adding a role which will include:
-name
-salary
-department it belongs to

make a function for adding an employee to the database which will include:
-first name
-last name
-role
-manager

make a function for updating a employee which will grab it based on id:
-update their role via multiple choice?
 */