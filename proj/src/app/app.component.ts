import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div>{{name}}</div>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proj';
  name: string;
  constructor(){
    this.name = "saikat";
  }
}
