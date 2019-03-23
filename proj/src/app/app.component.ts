import { Component, Input } from '@angular/core';

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
  selector: 'joke',
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{joke.setup}}</h4>
      <p class="card-text" [hidden]="joke.hide">{{joke.punchline}}</p>
      <button class="btn btn-primary" (click)="joke.toogle()">Tell Me</button>
    </div>
  `
})
export class JokeComponent {
  @Input() joke: Joke;
}

@Component({
  selector: 'joke-list',
  template: `<joke *ngFor="let j of jokes" [joke]="j"></joke>`
})
export class JokeListComponent {
  jokes: Joke[];
  constructor(){
    this.jokes = [
      new Joke('HEADER111', 'PARAGRAPH111'),
      new Joke('HEADER222', 'PARAGRAPH222'),
      new Joke('HEADER333', 'PARAGRAPH333')
    ]
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
