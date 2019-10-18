import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
MatButtonModule,
MatCardModule,
MatInputModule,
MatBadgeModule
} from '@angular/material';
// import { UserIdleModule } from 'angular-user-idle';
import { UserIdleModule } from '../../projects/angular-user-idle/src/lib/angular-user-idle.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './timer/timer.component';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { GithubIconComponent } from './github-icon/github-icon.component';
import { ApiInfoComponent } from './api-info/api-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HeaderComponent,
    DescriptionComponent,
    FooterComponent,
    GithubIconComponent,
    ApiInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserIdleModule.forRoot({idle: 5, timeout: 10, ping: 60}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
