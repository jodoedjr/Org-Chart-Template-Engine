class Employee {//base default class to be extended by subclasses
    constructor(name, id, email){//create employee object with name, id #, and email address
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee"; // default role
    }
}

module.exports = Employee;