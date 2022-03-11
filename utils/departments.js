const cTable = require('console.table');
let Table = require('easy-table')

let viewDepartments = function() {
    let viewAll = 'SELECT * FROM departments';

    /* somehow insert viewall into mysql to return the mysql results */

    console.log(Table.print('Viewing all departments', [`${viewAll}`]))

    console.table('Viewing all Departments', [`${viewAll}`]);
};

let createDepartment = function() {
    let departentCreation = `INSERT INTO departments (dept_name, description) VALUES (${inputDept_Name}, ${inputDescription})`

    /* get inquirer input and then place into variable above and then send to table */

    return console.log('Congrats! You created a department!')
};

module.exports = viewDepartments;
module.exports = createDepartment;

/* create the following functions to use inquirer data? insertDepartmentTitle // insertDepartmentDescription */