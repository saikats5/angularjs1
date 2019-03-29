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

let a: number;
a = 1;
number, boolean, string
let list: number[] = [1,2,3]; // bracket notation
let lists: Array<number> = [1,2,3];// generic type
let fun: Function = ()=> console.log("Hello");
function returnNumber(): number {
    return 1;
}
enum Direction {
    Up,
    Down,
    Left,
    Right
}
let go: Direction;
go = Direction.Up;

class Person {};
let person: Person;
let people: Person[];

let notsure: any = 1;
notsure = 'hello';

function returnNothing(): void {
    console.log('foo'); // return nothing
}

let value: any = "saikat saha";
(<string>value).length;

Generic type
class Audio {}
class Video {}
class Link {}
class Text {}

class Post<T>{
    content: T;
}
let videoPost: Post<Video>;

// don't provide any type then typescript assumes it to be 'any'
// tsconfig.json // noImplicitAny: false // will accept 'any' // if true then throw error as it requires the type

ng g c LoginButton --> login-button // camelcase divides by -
ng g directive <name>
ng g pipe <name>
ng g service <pipe>
ng g class <name> // doesn't append class to it unlike others
ng g interface <name>
ng g enum <name>

ng build // hosting on another server with minification // dev build
ng build --prod // prod build

class inside styles create a attribute for that component and it's get associated with the class
encapsulation: ViewEncapsulation.Native(style does not leak out of the component scope -- uses shadow dom) -- by default it's emulated
encapsulation: ViewEncapsulation.None(leak out the style) // inserted into HTML page as style tag