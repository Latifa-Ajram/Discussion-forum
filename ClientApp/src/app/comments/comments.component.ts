import { Component, OnInit } from '@angular/core';
import { IComment } from './comment';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from './comments.service';

@Component({
  selector: 'app-comments-component',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  //Variables:
  viewTitle: string = 'Comment';
  private _listfilter: string = "";
  comments: IComment[] = [];
  postId: number = -1;
  filteredComments: IComment[] = this.comments;

   //Constructor to initialize imported services:
  constructor(
      private _router: Router,
      private _commentService: CommentService,
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
      this.filteredComments = this.performFilter(value);
  }

  //A method that returns a list of categories based on the passed string.
  performFilter(filterBy: string): IComment[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.comments.filter((comment: IComment) =>
          comment.CommentDescription.toLocaleLowerCase().includes(filterBy));
  }

  //This method Takes in the passed comment, checks with the user that it still wants to delete it, then passes it on to the service, and we subscribe for a callback.
  //We then recive the response from the back - end, if accepted then the filter is updated, if not, then an error is logged.
  deleteComment(comment: IComment): void {
      const confirmDelete = confirm(`Are you sure you want to delete "${comment.CommentDescription}"?`);
      if (confirmDelete) {
          this._commentService.deletePost(comment.CommentId)
              .subscribe(
                  (response) => {
                      if (response.success) {
                          console.log(response.message);
                          this.filteredComments = this.filteredComments.filter(i => i !== comment);
                      }
                  },
                  (error) => {
                      console.error('Error deleting comment:', error);
                  });
      }
  }

  //Gets all the posts corresponding with the current postId set. The service passes the methods name and id. We subscribe for a callback.
  //This data populates the list of comments we want to show.
  getCommentsByPostId(id: number): void {
    this._commentService.getCommentsByPostId(id)
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.comments = data;
        this.filteredComments = this.comments;
      }
      );
  }

  //A method that invokes the get comments in service and subscribes for a callback.
  //When the callback is recived, we then set it in the view by populating the lists corresponding with the view.
  getComments(): void {
      this._commentService.getComment()
          .subscribe(data => {
              console.log('All', JSON.stringify(data));
              this.comments = data;
              this.filteredComments = this.comments;
          }
          );
  }

   //Routing method that passes url, a string and an Id:
  createNewComment() {
    this._router.navigate(['/commentform','create' ,this.postId]);
  }

  //Routing method that takes in an Id. passes url, a string and two different Id`s:
  updateSelectedComment(commentId: number) {
    this._router.navigate(['/commentform', 'edit', this.postId, commentId]);
  }

  //On intialization of this class this method runs and checks the routing for the value of the data:
  //If it is equal to - 1, then "getComments()" is invoked, if not, then "getCommentsByPostId" is.
  ngOnInit(): void {
    console.log('CommentComponent created');
    this._route.params.subscribe(params => {
      if (params['id'] == -1) {
        console.log("KOMMER I IF STATEMENT");
        this.getComments();
      }
      else {
        console.log("KOMMER I ELSE");
        this.getCommentsByPostId(+params['id']);
        this.postId = +params['id'];
      }
    });
  }
}
