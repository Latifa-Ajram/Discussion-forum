import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CategorysComponent } from './categorys/categorys.component';
import { CategoryformComponent } from './categorys/categoryform.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomformComponent } from './rooms/roomform.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicformComponent } from './topics/topicform.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CategorysComponent,
    CategoryformComponent,
    RoomsComponent,
    RoomformComponent,
    TopicsComponent,
    TopicformComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'categorys', component: CategorysComponent },
      { path: 'categoryform', component: CategoryformComponent },
      { path: 'categoryform/:mode/:id', component: CategoryformComponent },
      { path: 'rooms', component: RoomsComponent }, // Add the Rooms route
      { path: 'roomform', component: RoomformComponent }, // Add the Roomform route
      { path: 'roomform/:mode/:id', component: RoomformComponent }, // Add the Roomform with mode and id route
      { path: 'topics', component: TopicsComponent },
      { path: 'topicform', component: TopicformComponent },
      { path: 'topicform/:mode/:id', component: TopicformComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
