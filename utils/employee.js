/* const viewEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM employees`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}  */

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



//check to see which is correct or not

/* ).then(function ({ first_name, last_name, manager }) {
    connection.query("INSERT INTO employee (first_name, last_name, manager) 
         VALUES ?", ('first_name', 'last_name', 'manager'), function (err, result) {
        if (err) throw err;
}) */