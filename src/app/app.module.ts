import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule,
      MatCardModule,
      MatButtonModule,
      MatCheckboxModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      MatIconModule

  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
