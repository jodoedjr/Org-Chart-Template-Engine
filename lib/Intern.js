const Employee = require("../lib/Employee");

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);//call the parent class constructor
        this.school = school;//add the subclass specific field
    }
}

Intern.prototype.getSchool = function(){
    return this.school;
}
Intern.prototype.getRole = function(){
    return "Intern";
}

module.exports = Intern;