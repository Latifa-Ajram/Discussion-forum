import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryformComponent } from './categories/categoryform.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomformComponent } from './rooms/roomform.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicformComponent } from './topics/topicform.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CategoriesComponent,
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
      { path: 'Categories', component: CategoriesComponent },
      { path: 'categoryform', component: CategoryformComponent },
      { path: 'categoryform/:mode/:id', component: CategoryformComponent },
      { path: 'rooms/', component: RoomsComponent },
      { path: 'rooms/:id', component: RoomsComponent },
      { path: 'roomform', component: RoomformComponent }, // Add the Roomform route
      { path: 'roomform/:mode/:id', component: RoomformComponent }, // Add the Roomform with mode and id route
      { path: 'topics', component: TopicsComponent },
      { path: 'topics/:id', component: TopicsComponent },
      { path: 'topicform', component: TopicformComponent },
      { path: 'topicform/:mode/:id', component: TopicformComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
