import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from './comments.service';
import { PostService } from '../posts/posts.service';
import { idValidator } from '../services/IDValidator';




@Component({
  selector: "app-comments-commentform",
  templateUrl: "./commentform.component.html",
  styleUrls: ['./comments.component.css']
})
export class CommentformComponent {
  //Variables:
  commentForm: FormGroup;
  isEditMode: boolean = false;
  commentId: number = -1;
  postId: number = -1;

   //Initilizing imported services and the form we are using inside the view in order to populate it:
  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _postService: PostService
  ) {
    this.commentForm = _formbuilder.group({
      commentDescription: ['', Validators.required],
      postId: [-1, [idValidator()]]
    });
  }

  //A method invoked when the class is initialized.
  //Depending on the params different data is set. If the mode is create we patch the post Id to set the current post we are trying create a comment for.
  //If the parameters is like "edit", then we also set the data by getting the specific comment:
  ngOnInit(): void {
    this._route.params.subscribe(params => {// Create mode
      if (params['mode'] === 'create') {
        this.isEditMode = false; 
        this.postId = +params['postId']; //This can never be -1 like in the other pages. This is beacuse to create a comment you have to have entered via a post, and not the nav-bar.
        this.commentForm.patchValue({
          postId: this.postId
        });
      }
      else if (params['mode'] === 'edit') {// Edit mode
        this.isEditMode = true; 
        this.postId = +params['postId'];
        this.commentId = +params['commentId']; // Convert to number
        this.loadCommentForEdit(this.commentId);
      }
    });
  }

  //Method that takes in a comment id, uses the service to invoke the getCommentById and subscribes for the callback. When the data returns,
  //it is patched into the form, but if it fails, then data is logged instead:
  loadCommentForEdit(commentId: number) {
    this._commentService.getCommentById(commentId)
      .subscribe(
        (comment: any) => {
          console.log('retrived comment: ', comment);
          this.commentForm.patchValue({
            commentDescription: comment.CommentDescription,
            postId: comment.PostId
          });
        },
        (error: any) => {
          console.error('Error loading comment for edit:', error);
        }
      );
  }

  //This method is invoked when the submit button is clicked via the eventcall from the form. The forms values are retrieved and set inside the newComment object.
  //If this was an edit of a existing comment, then we invoke the updateComment method from the service and subscribe for a callback.
  //If not, then we invoke the createComment from the service and subscribe for the callback from it. If they succeed,
  //then we are passed back to the list of all comments of the current chosen post:
  onSubmit() {
    console.log("CommentCreate form submitted:");
    console.log(this.commentForm);
    const newComment = this.commentForm.value;
    if (this.isEditMode) {
      this._commentService.updateComment(this.commentId, newComment)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/comments', this.postId]);
          }
          else {
            console.log('Comment update failed');
          }
        });
    }
    else {
      this._commentService.createComment(newComment)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/comments', this.postId]);
          }
          else {
            console.log('Comment creation failed');
          }
        });
    }
  }

   //A method connected to a button that routes us back to comments
  backToComments() {
    this._router.navigate(['/comments', this.postId]);
  }


}


