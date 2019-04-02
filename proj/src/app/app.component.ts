import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef, ContentChild, AfterViewInit, AfterContentInit } from '@angular/core';

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
  template: `
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
