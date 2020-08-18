//require Manager, Engineer, and Intern subclasses
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//require inquirer, path, and fs modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//ouput directory and output path for html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//require html rendering functions
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

async function createManager() {//prompt the user for the manager's information
    let data = await inquirer.prompt([ // await user reponse to these questions
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
    return new Manager(data.name, data.id, data.email, data.officeNumber); //return a new, populated manager object
}
async function createEngineer() {//prompt the user for the enginner's information
    const data = await inquirer.prompt([//await the user response to these questions
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
    return new Engineer(data.name, data.id, data.email, data.github);//return a new, populated engineer object
}
async function createIntern() {//prompt the user for the intern's information
    const data = await inquirer.prompt([//await the user response to these questions
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

async function createEmployee(type) {
    let data = {};
    switch (type) {
        case "Manager":
            data = await inquirer.prompt(managerQuestions);
            return new Manager(data.name, data.id, data.email, data.officeNumber);
        case "Engineer":
            data = await inquirer.prompt(engineerQuestions);
            return new Engineer(data.name, data.id, data.email, data.github);
        case "Intern":
            data = await inquirer.prompt(internQuestions);
            return new Intern(data.name, data.id, data.email, data.school);
        default:
            data = await inquirer.prompt(managerQuestions);
            return new Manager(data.name, data.id, data.email, data.officeNumber);
    }
}

async function initialize() {
    const employees = []; // initialize array of employees
    let employeeHolder = await createEmployee("Manager"); //create a manger, returns a Manager object
    employees.push(employeeHolder); // add Manager to employee array
    let continueLoop = true;
    while (continueLoop) { // while loop runs until user chooses to exit
        const data = await inquirer.prompt([// await user input to add engineer, add intern, or exit
            {
                type: "list",
                name: "Options",
                message: "Add an employee, or exit and create org chart:",
                choices: ["Add Engineer", "Add Intern", "Finished - Create Org Chart"]
            }
        ]);
        switch (data.Options) {
            case "Add Engineer":
                employeeHolder = await createEmployee("Engineer"); //returns Engineer object
                employees.push(employeeHolder); // adds employee to array
                break;
            case "Add Intern":
                employeeHolder = await createEmployee("Intern"); //returns Intern object
                employees.push(employeeHolder); // adds employee to array
                break;
            default:
                continueLoop = false; // creates condition to exit while loop
        }
    }
    console.log(employees);
    const html = render(employees); //returns string of html code populated with employees array data
    fs.writeFile(outputPath, html, function (err) { // write html file to output path
        if (err) { //if err, attempt to create the output directory
            fs.mkdir(OUTPUT_DIR, 0777, function (err) {
                if (err) { //if that errs, log err and return
                    console.log(err);
                    return;
                }
                console.log(`Created "${OUTPUT_DIR}" directory`);//success creating directory
            });
        }
        console.log(`Wrote Org-Chart to "${outputPath}"`);//success writing to file
    });
}

initialize();//run program