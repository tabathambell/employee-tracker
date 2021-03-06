const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { exists } = require('fs');
const { exit } = require('process');

//create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'HalloweenTime7031!',
    database: 'company'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    initialPrompt();
});

initialPrompt = () => {
    inquirer
        .prompt(questions)

        .then(answers => {
            switch (answers.options) {
                case "View Departments":
                    viewDepartments()
                    break;
                case "View Roles":
                    viewRoles()
                    break;
                case "View Employees":
                    viewEmployees()
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Remove Employee":
                    removeEmployee()
                    break;
                case "Update Employee Role":
                    aboutRole()
                    break;
                case "End":
                    connection.end()
                    break;
            };
        })
        .catch(err => {
            if (err) throw err;
        });
};

const questions = {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ["View Departments",
        "View Roles",
        "View Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "End"
    ],
};

// View Departments

viewDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

// View Roles

viewRoles = () => {
    console.log('Selecting all roles...\n');
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

// View Employees

viewEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

// Add Employee

function addEmployee() {
    console.log('Inserting a new employee...\n');
    const query = connection.query('SELECT * FROM role',
        function (err, result) {
            const employeeAdd = result.map(role => ({ name: role.title, value: role.id }));
            const EmployeeAddQuestions = [
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter employee's first name."
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter employee's last name."
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "Enter employee's role.",
                    choices: employeeAdd
                },
            ];
            inquirer
                .prompt(EmployeeAddQuestions)

                .then(answers => {
                    console.log(answers);
                    console.log('Updating employee roster...\n');
                    const query = connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answers.first_name,
                            last_name: answers.last_name,
                            role_id: answers.roleId
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + ' record updated!\n');
                            initialPrompt();
                        }
                    );
                })
                .catch(err => {
                    if (err) throw err;
                });
        })
};

// Remove Employee

function removeEmployee() {
    const query = connection.query('SELECT * FROM employee',
        function (err, result) {
            console.log(result);
            const employeeNames = result.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
            const EmployeeDeleteQuestions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: 'What employee do you want to delete?',
                    choices: employeeNames,
                },
            ];
            inquirer
                .prompt(EmployeeDeleteQuestions)

                .then(answers => {
                    console.log(answers);
                    console.log('Updating employee role...\n');
                    const query = connection.query(
                        'DELETE FROM employee WHERE ?',
                        [
                            {
                                id: answers.employee
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + ' record updated!\n');
                            initialPrompt();
                        }
                    );
                })
                .catch(err => {
                    if (err) throw err;
                });
        });
    }

// Update Employee Role

function aboutRole() {
    const query = connection.query('SELECT * FROM employee',
        function (err, result) {
            console.log(result);
            const employeeNames = result.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
            const query = connection.query('SELECT * FROM role',
                function (err, result) {
                    console.log(result);
                    const employeeRoles = result.map(role => ({ name: role.title, value: role.id }));
                    const EmployeeRoleQuestions = [
                        {
                            type: 'list',
                            name: 'employee',
                            message: 'What employee do you want to update?',
                            choices: employeeNames,
                        },
                        {
                            type: 'list',
                            name: 'roles',
                            message: "What is the employee's new role?",
                            choices: employeeRoles,
                        },
                    ];
                    inquirer
                        .prompt(EmployeeRoleQuestions)

                        .then(answers => {
                            console.log(answers);
                            console.log('Updating employee role...\n');
                            const query = connection.query(
                                'UPDATE employee SET ? WHERE ?',
                                [
                                    {
                                        role_id: answers.roles
                                    },
                                    {
                                        id: answers.employee
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' record updated!\n');
                                    initialPrompt();
                                }
                            );
                        })
                        .catch(err => {
                            if (err) throw err;
                        });
                })
        });
};