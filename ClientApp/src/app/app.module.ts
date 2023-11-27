import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryformComponent } from './categories/categoryform.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomformComponent } from './rooms/roomform.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicformComponent } from './topics/topicform.component';
import { PostsComponent } from './posts/posts.component';
import { PostformComponent } from './posts/postform.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentformComponent } from './comments/commentform.component';
import { SearchComponent } from './search/search.component'; // Adjust the path based on your actual structure
import { SearchformComponent } from './search/searchform.component'; 




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryformComponent,
    RoomsComponent,
    RoomformComponent,
    TopicsComponent,
    TopicformComponent,
    PostsComponent,
    PostformComponent,
    CommentsComponent,
    CommentformComponent,
    SearchComponent,
    SearchformComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      //Here we have defined the routing paths and what they should consist of. If the used url in the application matches one of these paths,
      //then it will route them to that place:
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categoryform', component: CategoryformComponent },
      { path: 'categoryform/:mode/:id', component: CategoryformComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'rooms/:id', component: RoomsComponent },
      { path: 'roomform', component: RoomformComponent }, 
      { path: 'roomform/:mode/:categoryId', component: RoomformComponent }, 
      { path: 'roomform/:mode/:categoryId/:roomId', component: RoomformComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'topics/:id', component: TopicsComponent },
      { path: 'topicform', component: TopicformComponent },
      { path: 'topicform/:mode/:roomId', component: TopicformComponent },
      { path: 'topicform/:mode/:roomId/:topicId', component: TopicformComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'posts/:id', component: PostsComponent },
      { path: 'postform', component: PostformComponent },
      { path: 'postform/:mode/:topicId', component: PostformComponent },
      { path: 'postform/:mode/:topicId/:postId', component: PostformComponent },
      { path: 'comments', component: CommentsComponent },
      { path: 'comments/:id', component: CommentsComponent },
      { path: 'commentform', component: CommentformComponent },
      { path: 'commentform/:mode/:postId', component: CommentformComponent },
      { path: 'commentform/:mode/:postId/:commentId', component: CommentformComponent },
      { path: 'search', component: SearchformComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
