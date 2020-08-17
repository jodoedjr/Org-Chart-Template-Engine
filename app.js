const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's ID #?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email address?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's ID #?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?"
    }
];
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's ID #?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
    }
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function createManager() {//prompt the user for the manager's information
    let data = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID #?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ]);
    return new Manager(data.name, data.id, data.email, data.officeNumber);
}
async function createEngineer() {//prompt the user for the enginner's information
    const data = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID #?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }
    ]);
    return new Engineer(data.name, data.id, data.email, data.github);
}
async function createIntern() {//prompt the user for the intern's information
    const data = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID #?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        }
    ]);
    return new Intern(data.name, data.id, data.email, data.school);
}

async function addEmployee() {
    const data = await inquirer.prompt([
        {
            type: "list",
            name: "Options",
            choices: ["Add Engineer", "Add Intern", "Finished - Create Org Chart"]
        }
    ]);
    let employeeHolder = {};
    switch (data.Options) {
        case "Add Engineer":
            employeeHolder = await createEngineer();
            break;
        case "Add Intern":
            employeeHolder = await createIntern();
            break;
        default:
            employeeHolder = await -1;
    }
    return employeeHolder;
}

async function initialize() {
    const employees = [];
    let employeeHolder = await createManager();
    employees.push(employeeHolder);
    while (employees[employees.length - 1] != -1) {
        const data = await inquirer.prompt([
            {
                type: "list",
                name: "Options",
                message: "Add an employee, or exit and create org chart:",
                choices: ["Add Engineer", "Add Intern", "Finished - Create Org Chart"]
            }
        ]);
        switch (data.Options) {
            case "Add Engineer":
                employeeHolder = await createEngineer();
                break;
            case "Add Intern":
                employeeHolder = await createIntern();
                break;
            default:
                employeeHolder = -1;
        }
        employees.push(employeeHolder);
    }
    employees.pop(); //remove -1 from array
    const html = render(employees);
    fs.writeFile(outputPath, html, function(err){
        if(err){
            //console.log(err);
            //return;
            fs.mkdir(OUTPUT_DIR, 0777, function(err){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(`Created "${OUTPUT_DIR}" directory`);
            });
        }
        console.log(`Wrote Org-Chart to "${outputPath}"`);
    });
}

initialize();//run program
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
