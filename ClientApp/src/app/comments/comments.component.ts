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

  viewTitle: string = 'Comment';
  private _listfilter: string = "";

  comments: IComment[] = [];
  postId: number = -1;


  constructor(
      private _router: Router,
      private _commentService: CommentService,
      private _route: ActivatedRoute
  ) { }

  get listFilter(): string {
      return this._listfilter;
  }

  set listFilter(value: string) {
      this._listfilter = value;
      console.log('In setter:', value);
      this.filteredComments = this.performFilter(value);
  }

  filteredComments: IComment[] = this.comments;

  performFilter(filterBy: string): IComment[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.comments.filter((comment: IComment) =>
          comment.CommentDescription.toLocaleLowerCase().includes(filterBy));
  }
    
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

  getCommentsByPostId(id: number): void {
    this.postId = id;
    this._commentService.getCommentsByPostId(id)
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.comments = data;
        this.filteredComments = this.comments;
      }
      );
  }


  getComments(): void {
      this._commentService.getComment()
          .subscribe(data => {
              console.log('All', JSON.stringify(data));
              this.comments = data;
              this.filteredComments = this.comments;
          }
          );
  }

  createNewComment() {
    this._router.navigate(['/comments', this.postId]);
  }

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
      }
    });
  }
}
