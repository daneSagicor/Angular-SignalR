import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';// Lazy Load this Component
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
   
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
