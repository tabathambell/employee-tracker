const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    afterConnection();
});

afterConnection = () => {
    inquirer
        .prompt(questions)

        .then(answers => {
            console.log(answers);
        })
        .catch(err => {
            if (err) throw err;
        });
};

const questions = {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ["View Employees",
        "View Employees By Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add Role",
        "Remove Role",
        "Update Employee Manager",
        "End"
    ],
};

// Update Employee Role

const EmployeeRoleQuestions = [
    {
        type: 'choice',
        name: 'employee',
        message: 'What employee do you want to update?',
        choices: '',
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the employee's new role?",
    },
];

inquirer
    .prompt(EmployeeRoleQuestions)
  
    .then(answers => {
      console.log(answers);
      updateRole();
    })
    .catch(err => {
        if (err) throw err;
    });

updateRole = () => {
    console.log('Updating employee role...\n');
    const query = connection.query(
        'UPDATE role SET ?, ?, ? WHERE ?',
        [
            {
                title: answers.title
            },
            {
                salary: answers.salary
            },
            {
                department_id: answers.department_id
            },
            {
                id: answers.id
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' record updated!\n');
            deleteRole();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
};