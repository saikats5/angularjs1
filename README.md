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

content projection - <ng-content></ng-content>

life cycle hooks
--- PARENT COMPONENT/OWN COMPONENT
-- contructor // when component is created
-- ngOnChanges // everytime there is change on Input property of the component
-- ngOnInit // current component is being initialized only once after changes
-- ngDoCheck // change detector of the given component is being invoked, allow us to implement our own change detection // donot use ngOnChanges and ngDoCheck together in the same component
-- ngOnDestoy // before the angular destroys the component used to avoid memory leaks

--- CHILD COMPONENT
-- ngAfterContentInit // called after any content projection into the view
-- ngAfterContentChecked // checked everytime by change detection mechanism by Angular
-- ngAfterViewInit // component view has been fully initialized
-- ngAfterViewChecked // checked everytime by change detection mechanism by Angular

ngOnChanges(change: SimpleChange) // SimpleChange need to be imported from angular core
no value -- CD_INIT_VALUE
implement interface of all the hooks required
import {Onchanges, OnInit, DoCheck} from '@angular/core';
class test implements OnChanges, OnInit, DoCheck {}

ViewChild // import from @angular/core
@ViewChild(JokeComponent) jokeViewChild: JokeComponent; // get initialized on ngAfterViewInit() // shows the first child

@ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
let jokes: JokeComponent[] = this.jokeViewChildren.toArray();

@ViewChild("header") headerEl: ElementRef;
this.headerEl.nativeElement.textContent = "Changed HEADER";
#header

@ContentChild(JokeComponent) jokeContentChild: JokeComponent;

<div *ngFor="let person of people; let i = index"> // index built-in keyword

<div *ngIf="person.age < 30"></div>

[ngSwitch]="person.country"
*ngSwitchCase="'test'"
*ngSwitchDefault

[ngStyle]="{'background-color':'green'}"
[ngStyle]="{'background-color': person.country === 'India' ? 'green' : 'yellow'}"
[style.background-color]="getColor(person.country)"
[ngStyle]="{'font-size.px':24}"
[ngStyle]="{'font-size.%':24}"
[style.font-size.px]="24"

[ngClass]="{'text-success': true}"
[ngClass]="{'text-success': person.country === 'IND', 'text-primary': person.country === 'UK'}"
[class]="'text-success'"

[class]="'text-success'" will replace class="class1 class2"
to make it work [class.text-success] = "true"
[class.text-success] = "person.country === 'IND'"

<p ngNonBindable>{{name}}</p> // {{name}}

3 built-in structural directive ngIf, ngFor, nfSwitch

The <template> tag holds its content hidden from the client. //HTML5
<ng-template [ngIf]="!data.hide">
    <p>{{data.test}}</p>
</ng-template>

<ng-template ngFor
             let-j
             [ngForOf]="jokes">
    <joke [joke]="j"></joke>
</ng-template>

// * tells the directive to treat the element as template, simplier way of writing structural directive with template

Custom Directive
import { Directive } from '@angular/core';
@Directive({
    selector: "[ccCardHover]" // [] -- attribute selector, . -- class seelector, name -- element selector
})
class CardHoverDirective {
    constructor(private el: ElementRef, private renderer: Renderer){ // import { ElementRef } from '@angular/core'; // give direct access to the DOM element to which it is attached
        el.nativeElement.style.backgroundColor = 'gray';
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    }
}

// ElementRef -- always be running on browser environment, to make it work on different environment, we have to use Renderer

HostListener / HostBinding // used along with directives
@HostListener('mouseover') onMouseOver(){
    let punchlineEl = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(punchlineEl, 'display', 'block');
    this.isHovering = true;
}

@HostBinding('class.card-outline-primary') private isHovering: boolean = false;

Configurable custom directive
[config]="{querySelector: 'p'}
@Input() config: Object = {querySelector: '.card-text'}
let punchlineEl = this.el.nativeElement.querySelector(this.config.querySelector);

[ccCardHover]="{querySelector: 'p'} // directly to the directive
@Input('ccCardHover') config: Object = {querySelector: '.card-text'}

Reactive Programming = Streams(sequence of data overtime) + Operations

RxJS

let obs = Rx.Obsevable; // observable is not a stream, blueprint to describe set of streams connected to operations
let obs = Rx.Obsevable.interval(1000).operator2().operator3();
operator act on observable to return observable, multiple operators can be applied on an observable
let obs = Rx.Obsevable.interval(1000) // does not retutn anything it is just called
obs.subscribe(value=>value);
let obs = Rx.Obsevable.interval(1000).take(3); // take is also an operator which creates a stream, no. of streams is equal to no. of operators // output --> 0 1 2
3 items will be taken from input stream and publish it to output stream
let obs = Rx.Obsevable.interval(1000).take(3).map(v=>Date.now());
we subscribe and get output of something pushed to last stream
by default observables are cold and gets hot whenever they get their first subscriber

//places where observables are in use
EventEmitter, HTTP, Forms(Recative Forms)

by using filter and map of RxJs we have restrict hackers from adding script/html tags
replace(/<(?:.|\n)*?>/gm, ''); // replace tag with empty space

Built-in Pipes
{{1234.56 | currency:'GBP':true}} // GBP1,234.56 // true will show pound symbol and now accepts many things
{{dateVal | date:'shortTime'}} // dateVal is new Date; private dateVal: Date = new Date(); // shortTime -- 3.23 PM // fullDate -- Saturday, October 29, 2016 // d/m/y -- 29/10/2019
{{3.1413645 | number:'3.1-2'}} // 003.14 // 1.4-4 -- 3.1414
{{jsonVal | json}} // {'name': 'MAX'}
{{'Saikat' | lowercase}} // uppercase -- SAIKAT
{{0.123456 | percent}} // 12.346% // percent:'2.1-2' -- 12.35%
{{[1,2,3,4,5,6] | slice:1:3}} // 2,3 // slice:2:-1 -- 3,4,5

Custom Pipe
import {Pipe} from '@angular/core';
@Pipe({
    name: "default"
})
class DefaultPipe {
    transform(value: string, fallback: string, forceHttps: boolean= false){
        let image = "";
        if(value){
            image = value;
        }else{
            image = fallback;
        }
        if(forceHttps){
            if(image.indexOf("https") === -1){
                image = image.replace('http', 'https');
            }
        }
        return image;
    }
}
<img [src]="imageUrl | default: 'http://google.com/abc.jpg' : true">

HTTP Module is a collection of multiple provider class
get?foo=moo&limit=25

OPTIONS request always send by browser for delete, put and post, just to make sure the app is allowed to perform delete, put and post

URLSearchParams--> query parameters

for post 2nd parameter should be a payload not query parameter and 3rd will be query parameter

