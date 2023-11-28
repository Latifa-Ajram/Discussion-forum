import { Component, OnInit } from '@angular/core';
import { IPost } from './post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './posts.service';


@Component({
    selector: 'app-posts-component',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  //Variables:
  viewTitle: string = 'Post';
  private _listfilter: string = "";
  private topicId: number = -1;
  posts: IPost[] = [];
  filteredPosts: IPost[] = this.posts;

  //Constructor to initialize imported services:
  constructor(
      private _router: Router,
      private _postService: PostService,
      private _route: ActivatedRoute
  ) { }

  get listFilter(): string {
      return this._listfilter;
  }

  //The set-method of the list filter passes the current string provided by the user from the HTML-file.
  //This value is passed to the perform filter, where the outcome is passed back to the user.
  set listFilter(value: string) {
    this._listfilter = value;
    console.log('In setter:', value);
    this.filteredPosts = this.performFilter(value);
  }

  //This method Takes in the passed post, checks with the user that it still wants to delete it, then passes it on to the service, and we subscribe for a callback.
  //We then recive the response from the back - end, if accepted then the filter is updated, if not, then an error is logged.
  deletePost(post: IPost): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${post.PostTitle}"?`);
    if (confirmDelete) {
      this._postService.deletePost(post.PostId)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response.message);
              this.filteredPosts = this.filteredPosts.filter(i => i !== post);
            }
          },
          (error) => {
            console.error('Error deleting post:', error);
          });
    }
  }

  //Routing method that takes in an Id. passes url, a string and two different Id`s:
  updateSelectedPost(postId: number) {
    this._router.navigate(['/postform', 'edit', this.topicId, postId]);
  }

   //Routing method that passes url, a string and an Id:
  createNewPost() {
    this._router.navigate(['/postform', 'create', this.topicId])
  }

  //A method that invokes the get posts in service and subscribes for a callback.
  //When the callback is recived, we then set it in the view by populating the lists corresponding with the view.
  getPosts(): void {
    this._postService.getPosts()
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.posts = data;
        this.filteredPosts = this.posts;
      }
      );
  }

  //Gets all the posts corresponding with the current topicId set. The service passes the methods name and id. We subscribe for a callback.
  //This data populates the list of posts we want to show.
  getPostsByTopicId(id: number): void {
    this._postService.getPostsByTopicId(id)
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.posts = data;
        this.filteredPosts = this.posts;
      }
      );
  }

   //A method that returns a list of categories based on the passed string.
  performFilter(filterBy: string): IPost[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.posts.filter((post: IPost) =>
      post.PostTitle.toLocaleLowerCase().includes(filterBy));
  }

  //On intialization of this class this method runs and checks the routing for the value of the data:
  //If it is equal to - 1, then "getPosts()" is invoked, if not, then "getPostsByTopicId" is.
  ngOnInit(): void {
      console.log('PostComponent created');
      this._route.params.subscribe(params => {
      if (params['id'] == -1) {
        console.log("KOMMER I IF STATEMENT");
        this.getPosts();
      }
      else {
        console.log("KOMMER I ELSE");
        this.getPostsByTopicId(+params['id']);
        this.topicId = +params['id'];
        this.setTopicName(+params['id'])
      }
    });
  }

  // Update the method to fetch the category name.
  // Awaits an object which we expect contains a string with the property topicName
  setTopicName(id: number): void {
    this._postService.getTopicNameById(id).subscribe(
      object => {
        this.viewTitle = object.topicName; // Set the viewTitle to the fetched category name
        console.log('Object recieved', object);
      },
      error => console.error('Error fetching category name: ', error)
    );
  }
}
