import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef, ContentChild, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;
  constructor(setup: string, punchline: string){
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }
  toggle(){
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'model-form',
  template: `
    <form [formGroup]="myform" novalidate (ngSubmit)="onSubmit()">
      <fieldset formGroupName='name'>
        <div class='form-group'>
          <label>First Name</label>
          <input type="text" class="form-control" formControlName='firstname'>
        </div>
        <div class='form-group'>
          <label>Last Name</label>
          <input type="text" class="form-control" formControlName='lastname'>
        </div>
      </fieldset>
      <div class="form-group"
      [ngClass]="{
        'has-success': email.valid && (email.dirty || email.touched),
        'has-danger': myform.controls.email.invalid && (myform.controls.email.dirty || myform.controls.email.touched)
      }">
        <label>Email</label>
        <input type="email" class="form-control" formControlName="email">

        <div class="form-control-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
          <p *ngIf="email.errors.required">Email is required</p>
          <p *ngIf="email.errors.pattern">Email must contain @</p>
        </div>

        <!--<div class="form-control-feedback" *ngIf="email.invalid && (email.dirty || email.touched)">
          <p>Email is required</p>
        </div>-->

        <pre>Dirty? {{myform.controls.email.dirty}}</pre>
        <pre>Pristine? {{myform.controls.email.pristine}}</pre>
        <pre>Touched? {{myform.controls.email.touched}}</pre>
        <pre>Untouched? {{myform.controls.email.untouched}}</pre>
        <pre>Valid? {{myform.controls.email.valid}}</pre>
        <pre>Invalid? {{myform.controls.email.invalid}}</pre>
      </div>
      <div class="form-group">
        <label>Pasword</label>
        <input type="password" class="form-control" formControlName="password">
      </div>
      <div class="form-group">
        <label>Language</label>
        <select class="form-control">
          <option value="">Please select a language</option>
          <option *ngFor="let lang of langs" [value]="lang">{{lang}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
})
export class ModelFormComponent implements OnInit {
  myform: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;

  langs: string[] = ['English', 'Hindi', 'Bengali'];

  ngOnInit(){
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.email = new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
    this.password = new FormControl('',[Validators.required, Validators.minLength(8)]);
    this.language = new FormControl();
  }

  createForm(){
    this.myform = new FormGroup({
      name: new FormGroup({
        firstname: this.firstname,
        lastname: this.lastname
      }),
      email: this.email,
      password: this.password,
      language: this.language
    })
  }

  onSubmit(){
    if(this.myform.valid){
      console.log(this.myform.value);
      this.myform.reset();
    }
  }

/*   ngOnInit(){
    this.myform = new FormGroup({
      name: new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required)
      }),
      email: new FormControl('',[Validators.required, Validators.pattern("[^ @]*[^ @]*")]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      language: new FormControl()
    })
  } */
}


@Component({
  selector: 'joke-form',
  template: `
    <div class="card card-block">
      <h4 class="card-title">Create Joke</h4>
      <div class="form-group">
        <input type="text" class="form-control" #setup placeholder="Enter the setup">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" #punchline placeholder="Enter the punchline">
      </div>
      <button type="button" (click)="createJoke(setup.value, punchline.value)" class="btn btn-primary">Create</button>
    </div>
  `
})
export class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
  createJoke(setup: string, punchline: string){
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}

@Component({
  selector: 'joke',
  template: `
    <div class="card card-block">
      <h4 class="card-title">
        <ng-content select="span"></ng-content>
      </h4>
      <ng-content select=".punchline"></ng-content>
      <button class="btn btn-primary" (click)="data.toggle()">Tell Me</button>
    </div>
  `
})
export class JokeComponent {
  @Input('joke') data: Joke;
}

@Component({
  selector: 'joke-list',
  template: ` <model-form></model-form>
              <joke-form (jokeCreated)="addJoke($event)"></joke-form>
              <h4 #header>HEADER OF THE COMPONENT</h4>
              <joke *ngFor="let j of jokes" [joke]="j">
                <span>{{j.setup}}</span>
                <h1 [hidden]="j.hide" class="punchline">{{j.punchline}}</h1>
              </joke>
            `
})
export class JokeListComponent implements AfterViewInit, AfterContentInit {
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
  @ViewChild("header") headerEl: ElementRef;

  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;

  jokes: Joke[];
  constructor(){
    this.jokes = [
      new Joke('HEADER111', 'PARAGRAPH111'),
      new Joke('HEADER222', 'PARAGRAPH222'),
      new Joke('HEADER333', 'PARAGRAPH333')
    ]
  }
  ngAfterContentInit(){
    console.log("----------------------->",this.jokeContentChild);
  }
  ngAfterViewInit(){
    //console.log("=====>",this.jokeViewChild);
    //console.log("=====>",this.jokeViewChildren);
    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    //console.log("=============>",jokes);
    //console.log("===================>",this.headerEl);
    this.headerEl.nativeElement.textContent = "Changed HEADER";
  }
  addJoke(joke){
    this.jokes.unshift(joke);
  }
}

@Component({
  selector: 'app-root',
  template: '<joke-list></joke-list>',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
/*   title = 'proj';
  name: string;
  constructor(){
    this.name = "saikat";
  } */
}
