import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SeatService } from './seat.service'; // Import the SeatService

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [BrowserModule, FormsModule],
  providers: [SeatService], // Register the SeatService
  bootstrap: [AppComponent],
})
export class AppModule {}