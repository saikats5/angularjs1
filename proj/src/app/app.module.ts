import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent, JokeListComponent, JokeComponent, JokeFormComponent, ModelFormComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginButtonComponent } from './header/login-button/login-button.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    JokeComponent,
    JokeFormComponent,
    ModelFormComponent,
    HeaderComponent,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
