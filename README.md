# angularjs1

arr: Object[];
arr: Array<Object>;

*ngFor - structural directive as it changes the structure

[] --> bind to the input of a component // hidden
() --> bind to output of a output

Domain Models

ngFor ngIf all comes from BrowserModule

#setup // template reference variable

class Person {
    private firstName = "";
    protected lastName = "";
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    private name(){
        return `${this.firstName} ${this.lastName}`;
    }
}

public, private(only accessible within class), protected(accessible within class and extendable class)

interface are all public no access modifier to be added

interface Human {
    firstName: string;
    lastName: string;
    name?: Function; // optional
    isDate?(time: Date): Function;
}

class Person implements Human {
    constructor(public firstName, public lastName){}
    private name(){
        return `${this.firstName} ${this.lastName}`;
    }
}

@ -- decorator is just a function
function course(target){ // target --> Person
    Object.defineProperty(target.prototype, 'course', {value: ()=>"Angular 2"});
}
@course
class Person {
    firstname;
    lastname;
    constructor(firstname, lastname){
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
let test = new Person('Max', 'Doe');
test.course();


function Student(config){
    return function(target){
                Object.defineProperty(target.prototype, 'course', {value: ()=>config.course});
            }
}
@Student({
    course: 'Angular 2'
})
class Person {
    firstname;
    lastname;
    constructor(firstname, lastname){
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
let test = new Person('Max', 'Doe');
test.course();

import a as b from './';
b();
import * as utils from './';
utils.b();
